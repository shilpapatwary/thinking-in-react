/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
class Boards {
  constructor() {
    this.init();
  }

  init() {
    this.bindings();
  }

  service(options) {
    fetch(options.url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: options.body,
      credentials: 'include',
    }).then(res => res.json())
      .then((data) => {
        options.callback(data);
      }).catch((err) => {
        console.log(err);
      });
  }

  createboard(data) {
    const markup = `<li class="board" id="${data.id}">
      <form id="boardUpdate${data.id}">
       <div class="boardHeader">
          <span class="boardTitle">${data.name}</span>
          <span class="deleteboard">X</span>
       </div>
      </form>
  </li>`;
    return markup;
  }

  insertMarkup(markup) {
    document.getElementById('boardsContainer').insertAdjacentHTML('beforeend', markup);
  }

  addboardToList(data) {
    this.insertMarkup(this.createboard(data));
    this.bindings();
  }

  displayboards(boards) {
    const boardsMarkup = [];
    boards.forEach((board) => {
      boardsMarkup.push(this.createboard(board));
    });
    this.insertMarkup(boardsMarkup.join(''));
    this.bindings();
  }

  showAllboards() {
    const options = {
      url: '/api/boards',
      method: 'get',
      credentials: 'include',
      callback: this.displayboards.bind(this),
    };
    this.service(options);
  }

  addboard() {
    const boardData = JSON.stringify({
      id: Math.floor(Math.random() * 100000),
      name: 'My board',
      lists: [],
    });
    const options = {
      url: '/api/boards',
      method: 'post',
      body: boardData,
      credentials: 'include',
      callback: this.addboardToList.bind(this),
    };
    this.service(options);
  }

  deleteFromList(board) {
    const elem = document.getElementById(board.id);
    document.getElementById('boardsContainer').removeChild(elem);
  }

  deleteboard(elem) {
    const boardId = elem.closest('.board').id;
    const options = {
      url: `/api/boards/${boardId}`,
      method: 'delete',
      credentials: 'include',
      callback: this.deleteFromList.bind(this),
    };
    this.service(options);
  }

  updateToList(data) {
    console.log('updated', data);
  }

  updateboard(elem) {
    const boardId = elem.closest('.board').id;
    const updateForm = document.getElementById(boardId).querySelector(`#boardUpdate${boardId}`);
    const formData = new FormData(updateForm);
    const updatedboard = {
      name: formData.get('name'),
    };
    const options = {
      url: `/api/boards/${boardId}`,
      method: 'put',
      body: JSON.stringify(updatedboard),
      credentials: 'include',
      callback: this.updateToList.bind(this),
    };
    this.service(options);
  }

  displayBoard(data) {
    console.log(data);
  }

  openBoard(elem) {
    const boardId = elem.id;
    const options = {
      url: `/api/boards/${boardId}`,
      method: 'get',
      credentials: 'include',
      callback: this.displayBoard.bind(this),
    };
    this.service(options);
  }

  bindings() {
    document.getElementById('createBoardIcon').addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.addboard();
    });
    Array.from(document.getElementsByClassName('deleteboard'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.deleteboard(event.currentTarget);
    }));
    Array.from(document.getElementsByClassName('updateboard'), c => c.addEventListener('click', (event) => {
      this.updateboard(event.currentTarget);
    }));
    Array.from(document.getElementsByClassName('board'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.openBoard(event.currentTarget);
    }));
    window.addEventListener('load', () => {
      this.showAllboards();
    });
  }
}
// eslint-disable-next-line no-new
new Boards();
