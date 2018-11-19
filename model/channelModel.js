const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
  id: String,
  name: String,
  messages: Array,
});

const channelModel = mongoose.model('channel', channelSchema);

module.exports = channelModel;
