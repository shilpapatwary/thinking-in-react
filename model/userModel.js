const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

module.exports.getUserById = (uid, cb) => {
  userModel.findOne({ id: uid }, cb);
};

module.exports.getUserByName = (name, cb) => {
  userModel.findOne({ username: name }, cb);
};

module.exports.createUser = (newUser, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (e, hash) => {
      if (e) throw err;
      // eslint-disable-next-line no-param-reassign
      newUser.password = hash;
      newUser.save(cb);
    });
  });
};

module.exports.comparePassword = (myPassword, hash, cb) => {
  bcrypt.compare(myPassword, hash, (err, isMatch) => {
    if (err) throw err;
    cb(null, isMatch);
  });
};
