/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import Channels from './channels';

export default class Workspaces {
  constructor() {
    this.init();
    this.channels = new Channels();
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

  renderViewService(options) {
    fetch(options.url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: options.body,
      credentials: 'include',
    }).then(res => res.text())
      .then((data) => {
        options.callback(data);
      }).catch((err) => {
        console.log(err);
      });
  }

  getNewWorkspaceMarkup(workspace) {
    return `<li id=${workspace.id} class='workspace'>
      <input type="text" id="workspaceName${workspace.id}" class="workspaceTitle" value="${workspace.name}"/>
      <i class="fa fa-plus-square addChannel" id="addChannel${workspace.id}"></i>
      <i class="fa fa-user-plus addUser" id="addUser${workspace.id}"></i>  
      <i id="update${workspace.id}" class="fa fa-edit updateWorkspace"></i>
      <i class="fa fa-trash deleteWorkspace"></i>
      <i class="fa fa-sign-in openWorkspace"></i>
     </li>`;
  }

  addWorkspaceToList(data) {
    const markup = this.getNewWorkspaceMarkup(data);
    document.getElementById('workspaceContainer').insertAdjacentHTML('afterbegin', markup);
    this.bindings();
    // this.channels.bindings();
  }

  createWorkspace() {
    const workspaceData = JSON.stringify({
      id: Math.floor(Math.random() * 100000),
      name: 'My Workspace',
      users: [],
      channels: [],
    });
    const options = {
      url: '/api/workspaces',
      method: 'post',
      body: workspaceData,
      credentials: 'include',
      callback: this.addWorkspaceToList.bind(this),
    };
    this.service(options);
  }

  loadWorkspaces(data) {
    const markup = [];
    data.forEach((workspace) => {
      markup.push(this.getNewWorkspaceMarkup(workspace));
    });
    document.getElementById('workspaceContainer').insertAdjacentHTML('afterbegin', markup.join(''));
    this.bindings();
    this.channels.bindings();
  }

  loadAllWorkspaces() {
    const options = {
      url: '/api/workspaces',
      method: 'get',
      credentials: 'include',
      callback: this.loadWorkspaces.bind(this),
    };
    this.service(options);
  }

  deleteWorkspaceFromList(workspace) {
    const elem = document.getElementById(workspace.id);
    document.getElementById('workspaceContainer').removeChild(elem);
  }

  deleteWorkspace(elem) {
    const workspaceId = elem.closest('.workspace').id;
    const options = {
      url: `/api/workspaces/${workspaceId}`,
      method: 'delete',
      credentials: 'include',
      callback: this.deleteWorkspaceFromList.bind(this),
    };
    this.service(options);
  }

  showSuccess(data) {
    document.getElementById(`${data.id}`).classList.add('success');
    setTimeout(() => {
      document.getElementById(`${data.id}`).classList.remove('success');
    }, 2000);
  }

  updateWorkspaceToList(data) {
    document.getElementById(`update${data.id}`).classList.add('success');
    setTimeout(() => {
      document.getElementById(`update${data.id}`).classList.remove('success');
    }, 2000);
  }

  updateWorkspace(elem) {
    const workspaceId = elem.closest('.workspace').id;
    const title = document.getElementById(`workspaceName${workspaceId}`).value;
    const updateWorkspace = {
      name: title,
    };
    const options = {
      url: `/api/workspaces/${workspaceId}`,
      method: 'put',
      body: JSON.stringify(updateWorkspace),
      credentials: 'include',
      callback: this.updateWorkspaceToList.bind(this),
    };
    this.service(options);
  }

  confirmUser(data) {
    document.getElementById('addUserToWorkspace').reset();
    document.getElementById('addUserForm').classList.add('hidden');
    this.showSuccess(data);
  }

  confirmChannel(data) {
    document.getElementById('addChannelToWorkspace').reset();
    document.getElementById('addChannelForm').classList.add('hidden');
    this.showSuccess(data);
  }

  loadWorkspaceUserForm(elem) {
    this.currentWorkSpace = elem.closest('.workspace').id;
    document.getElementById('addUserForm').classList.remove('hidden');
  }

  loadWorkspaceChannelForm(elem) {
    this.currentWorkSpace = elem.closest('.workspace').id;
    document.getElementById('addChannelForm').classList.remove('hidden');
  }

  addUserToWorkspace(workspace) {
    const user = document.getElementById('workspaceUser').value;
    const userData = JSON.stringify({
      id: `user${Math.floor(Math.random() * 100000)}`,
      name: user,
    });
    const options = {
      url: `/api/workspaces/${workspace}/users`,
      method: 'put',
      body: userData,
      credentials: 'include',
      callback: this.confirmUser.bind(this),
    };
    this.service(options);
  }

  addChannelToWorkspace(workspace) {
    const channel = document.getElementById('workspaceChannel').value;
    const channelData = JSON.stringify({
      id: `channel${Math.floor(Math.random() * 100000)}`,
      wid: workspace,
      name: channel,
      users:[]
    });
    const options = {
      url: `/api/workspaces/${workspace}/channels`,
      method: 'put',
      body: channelData,
      credentials: 'include',
      callback: this.confirmChannel.bind(this),
    };
    this.service(options);
  }

  openWorkspace(elem) {
    const workspaceId = elem.closest('.workspace').id;
    const options = {
      url: `/api/workspaces/${workspaceId}`,
      method: 'get',
      credentials: 'include',
      callback: this.displayChannels.bind(this),
    };
    this.service(options);
  }

  bindings() {
    document.getElementById('addWorkspace').addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      this.createWorkspace();
    });

    document.getElementById('workspaceHeader').addEventListener('click', () => {
      document.getElementById('workspaces').classList.remove('hidden');
    });

    Array.from(document.getElementsByClassName('deleteWorkspace'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.deleteWorkspace(event.currentTarget);
    }));

    Array.from(document.getElementsByClassName('updateWorkspace'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.updateWorkspace(event.currentTarget);
    }));

    Array.from(document.getElementsByClassName('addUser'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.loadWorkspaceUserForm(event.currentTarget);
    }));

    Array.from(document.getElementsByClassName('addChannel'), c => c.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      this.loadWorkspaceChannelForm(event.currentTarget);
    }));

    document.getElementById('submitWorkspaceUser').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.addUserToWorkspace(this.currentWorkSpace);
    });

    document.getElementById('submitWorkspaceChannel').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.addChannelToWorkspace(this.currentWorkSpace);
    });

    window.addEventListener('load', () => {
      this.loadAllWorkspaces();
    });
  }
}
