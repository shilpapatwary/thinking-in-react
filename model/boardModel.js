const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  id: Number,
  name: String,
  lists: [{
    id: Number,
    name: String,
    cards: [{
      id: Number,
      name: String,
    },
    ],
  }],
});

const boardModel = mongoose.model('board', boardSchema);

module.exports = boardModel;
