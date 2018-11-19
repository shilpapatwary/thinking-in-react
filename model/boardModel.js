const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  id: Number,
  name: String,
  lists: Array,
});

const boardModel = mongoose.model('board', boardSchema);

module.exports = boardModel;
