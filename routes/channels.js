const express = require('express');
const channelsController = require('../controllers/channelsController');
const isLoggedin = require('../userAuthentication');

const router = express.Router();

router.route('/')
  .get(isLoggedin, channelsController.getAllchannels);
router.route('/:id')
  .put(isLoggedin, channelsController.updatechannel)
  .get(isLoggedin, channelsController.getChannel);

module.exports = router;
