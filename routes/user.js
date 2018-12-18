/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../model/userModel');

const secret = 'shilpa';


const router = express.Router();

router.route('/login').get((req, res, next) => {
  try {
    res.set('Content-Type', 'text/html');
    res.status(201).sendFile(path.join(__dirname, '../public/views/login.html'));
  } catch (e) {
    next(e);
  }
}).post((req, res) => {
  const uname = req.body.username;
  const pswd = req.body.password;
  User.getUserByName(uname, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, message: 'user not found' });
    }
    User.comparePassword(pswd, user.password, (e, isMatch) => {
      if (e) throw err;
      if (isMatch) {
        const token = jwt.sign(JSON.parse(JSON.stringify(user)), secret, { expiresIn: 600000 });
        res.set('Authorization', `Bearer ${token}`);
        res.cookie('accessToken', token).send({ message: 'You are logged in!', token });
      } else {
        return res.json('password does not match');
      }
    });
  });
});

router.route('/register').get((req, res, next) => {
  try {
    res.set('Content-Type', 'text/html');
    res.status(201).sendFile(path.join(__dirname, '../public/views/register.html'));
  } catch (e) {
    next(e);
  }
}).post((req, res, next) => {
  try {
    const newUser = new User({ username: req.body.username, password: req.body.password });
    User.createUser(newUser, (err) => {
      if (err) {
        throw err;
      } else {
        res.set('Content-Type', 'text/html');
        res.status(201).send({ message: 'registered successfully' });
      }
    });
  } catch (e) {
    next(e);
  }
});

router.route('/authenticate').get((req, res, next) => {
  try {
    res.set('Content-Type', 'text/html');
    res.status(201).sendFile(path.join(__dirname, '../public/views/authenticate.html'));
  } catch (e) {
    next(e);
  }
})
  .post(passport.authenticate('local', { successRedirect: '/trello' }));

module.exports = router;
