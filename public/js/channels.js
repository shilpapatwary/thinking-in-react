/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
class Channels {
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

  createchannel(data) {
    const markup = `<li class="channel" id="${data.id}">
        <form id="channelUpdate${data.id}">
         <div class="channelHeader">
            <span class="channelTitle">${data.name}</span>
         </div>
        </form>
    </li>`;
    return markup;
  }

  createMessageContainer(data) {
    const markup = `<div class="channelMessages hidden" id="messageContainer${data.id}">
    <div class="messageContainer">
        </div>
        <div class="inputContainer">
            <form id="messageForm${data.id}" data-id="${data.id}">
                <input type="text" name="message" class="messageInput">
                <button class="submitMessage" id="submit${data.id}">Enter</button>
            </form>
        </div>
</div>`;
    return markup;
  }

  insertMarkup(markup) {
    document.getElementById('channelsContainer').insertAdjacentHTML('beforeend', markup);
  }

  insertMessageMarkup(markup) {
    document.getElementById('msgSec').insertAdjacentHTML('beforeend', markup);
  }

  addchannelToList(data) {
    this.insertMarkup(this.createchannel(data));
    this.bindings();
  }

  displaychannels(channels) {
    const channelsMarkup = [];
    const messageMarkup = [];
    channels.forEach((channel) => {
      channelsMarkup.push(this.createchannel(channel));
      messageMarkup.push(this.createMessageContainer(channel));
    });
    this.insertMarkup(channelsMarkup.join(''));
    this.insertMessageMarkup(messageMarkup.join(''));
    this.bindings();
  }

  showAllchannels() {
    const options = {
      url: '/api/channels',
      method: 'get',
      credentials: 'include',
      callback: this.displaychannels.bind(this),
    };
    this.service(options);
  }

  deleteFromList(channel) {
    const elem = document.getElementById(channel.id);
    document.getElementById('channelsContainer').removeChild(elem);
  }

  updateToList(data) {
    console.log('updated', data);
  }

  updatechannel(elem) {
    const channelId = elem.closest('.channel').id;
    const updateForm = document.getElementById(channelId).querySelector(`#channelUpdate${channelId}`);
    const formData = new FormData(updateForm);
    const updatedchannel = {
      name: formData.get('name'),
    };
    const options = {
      url: `/api/channels/${channelId}`,
      method: 'put',
      body: JSON.stringify(updatedchannel),
      credentials: 'include',
      callback: this.updateToList.bind(this),
    };
    this.service(options);
  }

  displaychannel(data) {
    this.addMessageToList(data);
    Array.from(document.getElementsByClassName('channelMessages'), (c) => { c.classList.add('hidden'); });
    document.getElementById(`messageContainer${data.id}`).classList.remove('hidden');
  }

  openchannel(elem) {
    const channelId = elem.id;
    const options = {
      url: `/api/channels/${channelId}`,
      method: 'get',
      credentials: 'include',
      callback: this.displaychannel.bind(this),
    };
    this.service(options);
  }

  addMessageToList(data) {
    const messageMarkup = [];
    data.messages.forEach((m) => {
      messageMarkup.push(`<div>${m.message}</div>`);
    });
    const container = document.getElementById(`messageContainer${data.id}`).querySelector('.messageContainer');
    container.innerHTML = messageMarkup.join('');
    document.getElementById(`messageForm${data.id}`).reset();
  }

  submitMessage(elem) {
    const messageForm = elem.parentElement;
    const newMessage = {
      message: messageForm.querySelector('.messageInput').value,
    };
    const options = {
      url: `/api/channels/${messageForm.getAttribute('data-id')}`,
      method: 'put',
      body: JSON.stringify(newMessage),
      credentials: 'include',
      callback: this.addMessageToList.bind(this),
    };
    this.service(options);
  }

  bindings() {
    Array.from(document.getElementsByClassName('channel'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.openchannel(event.currentTarget);
    }));
    window.addEventListener('load', () => {
      this.showAllchannels();
    });
    Array.from(document.getElementsByClassName('submitMessage'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.submitMessage(event.currentTarget);
    }));
  }
}
// eslint-disable-next-line no-new
new Channels();
