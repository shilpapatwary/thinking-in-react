/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

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
        const tken = jwt.sign(JSON.parse(JSON.stringify(user)), secret, { expiresIn: 600000 });
        res.json({
          success: true,
          token: tken,
          user: {
            id: user._id,
            username: user.username,
            password: user.password,
          },
        });
      } else {
        return res.json({ success: false, message: 'password does not match' });
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
        res.status(201).send('registered successfully');
      }
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
