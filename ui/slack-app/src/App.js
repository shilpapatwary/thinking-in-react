import React, { Component } from 'react';
import './Slack.css';
import 'font-awesome/css/font-awesome.min.css'
import WorkspaceContainer from './components/WorkspaceContainer';
import ChannelCointainer from './components/ChannelsContainer';

const data = require('./data.json');

class App extends Component {
  constructor() {
    super();
    this.state = {
      workspaces: data.workspaces,
      channels:[],
      showWorkspaces: true,
      showChannels: false,
      selectedWorkspace:'',
      users: []
    };
    this.openWorkspace = this.openWorkspace.bind(this);
    this.showWorkspaces = this.showWorkspaces.bind(this);
    this.addChannelToWorkspace = this.addChannelToWorkspace.bind(this);
    this.startUserThread = this.startUserThread.bind(this);
    this.saveMessages = this.saveMessages.bind(this);
  }

  showWorkspaces() {
    this.setState({showWorkspaces: true,
      showChannels: false});
  }

  openWorkspace(wid){
    const workspaceIndex = data.workspaces.findIndex(w => w.id === wid);
    if(workspaceIndex >= 0){
      const channels = data.workspaces[workspaceIndex].channels;
      const users = data.workspaces[workspaceIndex].users;
      this.setState({channels: channels, showWorkspaces: false,
        showChannels: true, selectedWorkspace: wid, users:users});
    }
  }

  addChannelToWorkspace(channel) {
    const workspaceIndex = data.workspaces.findIndex(w => w.id === this.state.selectedWorkspace);
    if(workspaceIndex >= 0){
      data.workspaces[workspaceIndex].channels.push(channel);
      this.setState({workspaces: data.workspaces, channels:data.workspaces[workspaceIndex].channels, showWorkspaces: false,
        showChannels: true});
    }
  }

  startUserThread(uname) {
    const workspaceIndex = data.workspaces.findIndex(w => w.id === this.state.selectedWorkspace);
    if(workspaceIndex >= 0){
     const userIndex =  data.workspaces[workspaceIndex].users.findIndex(u => u.name === uname );
     data.workspaces[workspaceIndex].users[userIndex].chat = true;
      this.setState({workspaces: data.workspaces, users: data.workspaces[workspaceIndex].users});
    }
  }

  saveMessages(cid, messages){
    const workspaceIndex = data.workspaces.findIndex(w => w.id === this.state.selectedWorkspace);
    if(workspaceIndex >= 0){
      const channelIndex = data.workspaces[workspaceIndex].channels.findIndex(c => c.id === cid);
      if(channelIndex >= 0) {
        data.workspaces[workspaceIndex].channels[channelIndex].messages = messages;
        this.setState({workspaces: data.workspaces});
      }
    }
  }

  render() {
    return (
    <div>
      <section id="workspaceParentContainer">
        {this.state.showWorkspaces && <WorkspaceContainer workspaces={this.state.workspaces} openWorkspace={this.openWorkspace}></WorkspaceContainer>}
      </section>
      <section id="channelParentContainer">
        {this.state.showChannels && <ChannelCointainer channels={this.state.channels} 
        users={this.state.users} showWorkspaces={this.showWorkspaces} 
        onAddChannel={this.addChannelToWorkspace} onUserThreadStart={this.startUserThread} 
        onMessageSent={this.saveMessages}></ChannelCointainer>}
      </section>
    </div>
    );
  }
}

export default App;
 