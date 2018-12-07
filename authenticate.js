/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtrctJwt = require('passport-jwt').ExtractJwt;
const User = require('./model/userModel');

const opts = {};

opts.jwtFromRequest = ExtrctJwt.fromExtractors([ExtrctJwt.fromAuthHeaderAsBearerToken(),
  req => (req.cookies ? req.cookies.accessToken : null)]);
opts.secretOrKey = 'shilpa';

passport.use(new JwtStrategy(opts, ((payload, done) => {
  console.log(payload);
  User.getUserById(payload.sub.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
})));

module.exports = passport;
