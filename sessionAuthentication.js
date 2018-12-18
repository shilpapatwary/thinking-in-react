/* eslint-disable no-undef */
const passport = require('passport');
const Local = require('passport-local').Strategy;
const user = require('./model/userModel');

passport.use(new Local((uname, password, done) => {
  user.findOne({ username: uname }, (err, usr) => {
    if (err) { return done(err); }
    if (!usr) { return done(null, false, { message: 'incorrect username' }); }
    user.comparePassword(password, usr.password, (e, isMatch) => {
      if (e) throw err;
      if (!isMatch) {
        return done(null, false, { message: 'incorrect password' });
      }
      return done(null, usr);
    });
  });
}));

passport.serializeUser((usr, done) => {
  /* eslint no-underscore-dangle: 0 */
  done(null, usr._id);
});

passport.deserializeUser((id, done) => {
  user.findById({ _id: id }, (err, usr) => {
    if (err) throw err;
    else {
      done(null, usr);
    }
  });
});

module.exports = passport;
