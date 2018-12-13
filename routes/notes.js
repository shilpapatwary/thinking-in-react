const express = require('express');
const notesController = require('../controllers/notesController');
const isLoggedin = require('../userAuthentication');

const router = express.Router();

router.route('/')
  .get(isLoggedin, notesController.getAllNotes)
  .post(isLoggedin, notesController.createNote);

router.route('/:id')
  .get(isLoggedin, notesController.getNote)
  .put(isLoggedin, notesController.updateNote)
  .delete(isLoggedin, notesController.deleteNote);

module.exports = router;
