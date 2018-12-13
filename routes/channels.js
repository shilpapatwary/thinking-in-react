const express = require('express');
const channelsController = require('../controllers/channelsController');
const isLoggedin = require('../userAuthentication');

const router = express.Router();

router.route('/')
  .get(channelsController.getAllchannels);
router.route('/:id')
  .put(channelsController.updatechannel)
  .get(channelsController.getChannel);
router.route('/:id/users')
  .put(channelsController.addUsersToChannel);

module.exports = router;
