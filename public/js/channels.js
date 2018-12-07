/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
// import io from 'socket.io-client';

export default class Channels {
  constructor() {
    this.socket = io();
    this.init();
  }

  init() {
    this.socketBindings();
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
            <input type="text" id=channelUser${data.id}>
            <i class="fa fa-user-plus addChannelUser" id="addUser${data.id}"></i>
            <i class="fa fa-users listUsers" id="listUser${data.id}"></i>
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

  displaychannels(workspace) {
    const wchannels = workspace.channels;
    const channelsMarkup = [];
    const messageMarkup = [];
    wchannels.forEach((channel) => {
      channelsMarkup.push(this.createchannel(channel));
      messageMarkup.push(this.createMessageContainer(channel));
    });
    this.insertMarkup(channelsMarkup.join(''));
    this.insertMessageMarkup(messageMarkup.join(''));
    document.getElementById('workspaceParentContainer').classList.add('hidden');
    document.getElementById('channelParentContainer').classList.remove('hidden');
    this.bindings();
  }

  showAllchannels(elem) {
    const workspaceId = elem.closest('.workspace').id;
    const options = {
      url: `/api/workspaces/${workspaceId}`,
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
    const channelId = elem.closest('.channel').id;
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
    const channelId = messageForm.getAttribute('data-id');
    const messageText = messageForm.querySelector('.messageInput').value;
    this.socket.emit('chat', { msg: messageText, channel: channelId });
    const newMessage = {
      message: messageText,
    };
    const options = {
      url: `/api/channels/${channelId}`,
      method: 'put',
      body: JSON.stringify(newMessage),
      credentials: 'include',
      // callback: this.addMessageToList.bind(this),
    };
    this.service(options);
  }

  confirmChannelUser(channel) {
    document.getElementById(`channelUser${channel.id}`).value = '';
    document.getElementById(`${channel.id}`).classList.add('success');
    setTimeout(() => {
      document.getElementById(`${channel.id}`).classList.remove('success');
    }, 2000);
  }

  addUserToChannel(elem) {
    const channelId = elem.closest('.channel').id;
    const user = document.getElementById(`channelUser${channelId}`).value;
    const userData = JSON.stringify({
      id: `user${Math.floor(Math.random() * 100000)}`,
      name: user,
    });
    const options = {
      url: `/api/channels/${channelId}/users`,
      method: 'put',
      body: userData,
      credentials: 'include',
      callback: this.confirmChannelUser.bind(this),
    };
    this.service(options);
  }

  displayUsers(channel) {
    const userList = document.getElementById('userListDialog');
    const userListMarkup = ['<div><i class="fa fa-close" id="closeUserDialog"></i></div>'];
    channel.users.forEach((user) => {
      userListMarkup.push(`<div>${user.name}</div>`);
    });
    userList.innerHTML = userListMarkup.join('');
    userList.classList.remove('hidden');
    this.bindings();
  }

  listChannelUsers(elem) {
    const channelId = elem.closest('.channel').id;
    const options = {
      url: `/api/channels/${channelId}`,
      method: 'get',
      credentials: 'include',
      callback: this.displayUsers.bind(this),
    };
    this.service(options);
  }

  bindings() {
    Array.from(document.getElementsByClassName('channelTitle'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.openchannel(event.currentTarget);
    }));
    Array.from(document.getElementsByClassName('openWorkspace'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.showAllchannels(event.currentTarget);
    }));
    Array.from(document.getElementsByClassName('submitMessage'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.submitMessage(event.currentTarget);
    }));
    Array.from(document.getElementsByClassName('addChannelUser'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.addUserToChannel(event.currentTarget);
    }));
    Array.from(document.getElementsByClassName('listUsers'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.listChannelUsers(event.currentTarget);
    }));
    document.getElementById('closeUserDialog').addEventListener('click', () => {
      document.getElementById('userListDialog').classList.add('hidden');
    });
  }

  socketBindings() {
    this.socket.on('chat', (data) => {
      const chatChannel = document.getElementById(`messageContainer${data.channel}`).querySelector('.messageContainer');
      chatChannel.insertAdjacentHTML('beforeend', `<div>${data.msg}</div>`);
      document.getElementById(`messageForm${data.channel}`).reset();
    });
  }
}
