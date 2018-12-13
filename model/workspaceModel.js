const mongoose = require('mongoose');

const workspaceSchema = mongoose.Schema({
  id: String,
  name: String,
  users: [{
    id: String,
    name: String,
  }],
  channels: [
    {
      id: String,
      wid: String,
      name: String,
      users: [{
        id: String,
        name: String,
      }],
    },
  ],
});

const workspaceModel = mongoose.model('workspace', workspaceSchema);

module.exports = workspaceModel;
