/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
class Notes {
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

  createNote(data) {
    const markup = `<li class="note" id="${data.noteId}">
    <form id="noteUpdate${data.noteId}">
     <div class="noteHeader">
        <span class="noteTitle"><input type="text" name="noteTitle" value="${data.noteTitle}"></span>
        <span class="deleteNote">X</span>
     </div>
     <div class="noteDescription">
            <textarea name="noteDescription">${data.noteDescription}</textarea>
     </div>
     <span class="updateNote">Update</span>
    </form>
</li>`;
    return markup;
  }

  insertMarkup(markup) {
    document.getElementById('notesContainer').insertAdjacentHTML('beforeend', markup);
  }

  addNoteToList(data) {
    this.insertMarkup(this.createNote(data));
    this.bindings();
  }

  displayNotes(notes) {
    const notesMarkup = [];
    notes.forEach((note) => {
      notesMarkup.push(this.createNote(note));
    });
    this.insertMarkup(notesMarkup.join(''));
    this.bindings();
  }

  showAllNotes() {
    const options = {
      url: '/api/notes',
      method: 'get',
      credentials: 'include',
      callback: this.displayNotes.bind(this),
    };
    this.service(options);
  }

  addNote() {
    const noteData = JSON.stringify({
      noteId: Math.floor(Math.random() * 100000),
      noteTitle: 'My Note',
      noteDescription: '',
      createdAt: new Date(),
    });
    const options = {
      url: '/api/notes',
      method: 'post',
      body: noteData,
      credentials: 'include',
      callback: this.addNoteToList.bind(this),
    };
    this.service(options);
  }

  deleteFromList(note) {
    const elem = document.getElementById(note.noteId);
    document.getElementById('notesContainer').removeChild(elem);
  }

  deleteNote(elem) {
    const noteId = elem.closest('.note').id;
    const options = {
      url: `/api/notes/${noteId}`,
      method: 'delete',
      credentials: 'include',
      callback: this.deleteFromList.bind(this),
    };
    this.service(options);
  }

  updateToList(data) {
    console.log('updated', data);
  }

  updateNote(elem) {
    const noteId = elem.closest('.note').id;
    const updateForm = document.getElementById(noteId).querySelector(`#noteUpdate${noteId}`);
    const formData = new FormData(updateForm);
    const updatedNote = {
      noteTitle: formData.get('noteTitle'),
      noteDescription: formData.get('noteDescription'),
    };
    const options = {
      url: `/api/notes/${noteId}`,
      method: 'put',
      body: JSON.stringify(updatedNote),
      credentials: 'include',
      callback: this.updateToList.bind(this),
    };
    this.service(options);
  }

  bindings() {
    document.getElementById('addNotesIcon').addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.addNote();
    });
    Array.from(document.getElementsByClassName('deleteNote'), c => c.addEventListener('click', (event) => {
      this.deleteNote(event.currentTarget);
    }));
    Array.from(document.getElementsByClassName('updateNote'), c => c.addEventListener('click', (event) => {
      this.updateNote(event.currentTarget);
    }));
    window.addEventListener('load', () => {
      this.showAllNotes();
    });
  }
}
// eslint-disable-next-line no-new
new Notes();
