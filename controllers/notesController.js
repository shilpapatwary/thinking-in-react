const notes = require('../data/notes.json');

const notesController = {
  getAllNotes: (req, res, next) => {
    try {
      if (req.query.sort_by === 'date') {
        const sortedNotes = [...notes];
        sortedNotes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        res.set('Content-Type', 'application/json');
        res.status(200).send(sortedNotes);
      } else {
        res.set('Content-Type', 'application/json');
        res.status(200).send(notes);
      }
    } catch (e) {
      next(e);
    }
  },
  getNote: (req, res, next) => {
    try {
      const note = notes.filter(n => n.noteId === parseInt(req.params.id, 10));
      if (note.length === 0) res.status(404).send('Note not found!');
      else {
        res.set('Content-Type', 'application/json');
        res.status(200).send(note);
      }
    } catch (e) {
      next(e);
    }
  },
  createNote: (req, res, next) => {
    try {
      const note = req.body;
      note.noteId = Math.floor(Math.random() * 100000);
      notes.push(note);
      res.set('Content-Type', 'application/json');
      res.status(201).send(note);
    } catch (e) {
      next(e);
    }
  },
  updateNote: (req, res, next) => {
    try {
      const note = req.body;
      const noteIndex = notes.findIndex(n => n.noteId === parseInt(req.params.id, 10));
      if (noteIndex === -1) res.status(404).send('Note Id not found');
      else {
        notes[noteIndex] = req.body;
        res.set('Content-Type', 'application/json');
        res.status(202).send(note);
      }
    } catch (e) {
      next(e);
    }
  },
  deleteNote: (req, res, next) => {
    try {
      const noteIndex = notes.findIndex(n => n.noteId === parseInt(req.params.id, 10));
      if (noteIndex === -1) res.status(404).send('Note Id not found');
      else {
        const note = notes[noteIndex];
        notes.splice(noteIndex, 1);
        res.set('Content-Type', 'application/json');
        res.set(200).send(note);
      }
    } catch (e) {
      next(e);
    }
  },
};

module.exports = notesController;
