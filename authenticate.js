/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
// const ExtrctJwt = require('passport-jwt').ExtractJwt;
const User = require('./model/userModel');

const opts = {};

const cookieExtractor = (req) => {
  const token = req && req.cookies ? req.cookies.accessToken : null;
  return token;
};
opts.jwtFromRequest = cookieExtractor;
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
