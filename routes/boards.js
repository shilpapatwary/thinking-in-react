const express = require('express');

const route = express.Router();

const boards = require('../boards.json');

route.get('/', (req, res, next) => {
  try {
    res.set('content-type', 'application/json');
    res.set(200).send(boards);
  } catch (e) {
    next(e);
  }
});

route.get('/:id', (req, res, next) => {
  try {
    const board = boards.filter(b => b.id === req.params.id);
    if (board.length === 0) res.set(404).send('board ID not found!');
    else {
      res.set('content-type', 'application/json');
      res.set(200).send(board);
    }
  } catch (e) {
    next(e);
  }
});

route.put('/:id', (req, res, next) => {
  try {
    const board = req.body;
    const boardIndex = boards.findIndex(b => b.id === req.params.id);
    if (boardIndex === -1) {
      res.set(404).send('Board ID not found');
    } else {
      boards[boardIndex] = board;
      res.set('content-type', 'application/json');
      res.set(202).send(board);
    }
  } catch (e) {
    next(e);
  }
});

route.post('/', (req, res, next) => {
  try {
    const board = req.body;
    board.id = `${Math.floor(Math.random() * 100000)}`;
    boards.push(board);
    res.set('content-type', 'application/json');
    res.set('201').send(board);
  } catch (e) {
    next(e);
  }
});

route.delete('/:id', (req, res, next) => {
  try {
    const boardIndex = req.params.id;
    const board = boards.filter(b => b.id === boardIndex);
    if (board.length === 0) res.set(404).send('Board ID Not Found');
    else {
      boards.splice(boardIndex, 1);
      res.set('content-type', 'application/json');
      res.set(200).send(board);
    }
  } catch (e) {
    next(e);
  }
});

// Create a list at an index in Board
route.post('/:id/lists', (req, res, next) => {
  try {
    const list = req.body;
    list.id = `${Math.floor(Math.random() * 100000)}`;
    const boardId = req.params.id;
    const boardIndex = boards.findIndex(b => b.id === boardId);
    if (boardIndex === -1) res.set(404).send('Board ID not found!');
    else {
      boards[boardIndex].lists.push(list);
      res.set('content-type', 'application/json');
      res.set(200).send(list);
    }
  } catch (e) {
    next(e);
  }
});

// Create a card at an index in a list in a Board
route.post('/:bid/lists/:id', (req, res, next) => {
  try {
    const card = req.body;
    card.id = `${Math.floor(Math.random() * 100000)}`;
    const boardId = req.params.bid;
    const boardIndex = boards.findIndex(b => b.id === boardId);
    if (boardIndex === -1) res.set(404).send('Board ID not found!');
    else {
      const listIndex = boards[boardIndex].lists.findIndex(l => l.id === req.params.id);
      const list = boards[boardIndex].lists[listIndex];
      list.cards.push(card);
      res.set('content-type', 'application/json');
      res.set(200).send(card);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = route;
