const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/passportdb', (err) => {
  if (err) {
    throw (err);
  } else {
    console.log('connected to DB!');
  }
});

module.exports = mongoose;
