const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  noteId: Number,
  noteTitle: String,
  noteDescription: String,
  createdAt: Date,
});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;
