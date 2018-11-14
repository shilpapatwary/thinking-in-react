
const boards = require('../data/boards.json');

const boardsController = {
  getAllBoards: (req, res, next) => {
    try {
      res.set('content-type', 'application/json');
      res.set(200).send(boards);
    } catch (e) {
      next(e);
    }
  },
  getBoard: (req, res, next) => {
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
  },
  updateBoard: (req, res, next) => {
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
  },
  deleteBoard: (req, res, next) => {
    try {
      const boardIndex = boards.findIndex(b => b.id === req.params.id, 10);
      if (boardIndex === -1) res.status(404).send('Board not found');
      else {
        const board = boards[boardIndex];
        boards.splice(boardIndex, 1);
        res.set('content-type', 'application/json');
        res.set(200).send(board);
      }
    } catch (e) {
      next(e);
    }
  },
  createBoard: (req, res, next) => {
    try {
      const board = req.body;
      board.id = `${Math.floor(Math.random() * 100000)}`;
      boards.push(board);
      res.set('content-type', 'application/json');
      res.set('201').send(board);
    } catch (e) {
      next(e);
    }
  },
  createListInBoard: (req, res, next) => {
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
  },
  createCardInList: (req, res, next) => {
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
  },
};

module.exports = boardsController;
