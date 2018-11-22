const express = require('express');
const boardsController = require('../controllers/boardsController');
const isLoggedin = require('../userAuthentication');

const router = express.Router();

router.route('/')
  .get(isLoggedin, boardsController.getAllBoards)
  .post(isLoggedin, boardsController.createBoard);

router.route('/:id')
  .get(isLoggedin, boardsController.getBoard)
  .put(isLoggedin, boardsController.updateBoard)
  .delete(isLoggedin, boardsController.deleteBoard);

// Create a list at an index in Board
router.route('/:id/lists').put(isLoggedin, boardsController.createListInBoard);

// Create a card at an index in a list in a Board
router.route('/:bid/lists/:id/cards').put(isLoggedin, boardsController.createCardInList);

module.exports = router;
