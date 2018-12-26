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
      showChannels: false
    };
    this.openWorkspace = this.openWorkspace.bind(this);
    this.showWorkspaces = this.showWorkspaces.bind(this);
  }

  showWorkspaces() {
    this.setState({showWorkspaces: true,
      showChannels: false});
  }
  openWorkspace(wid){
    const workspaceIndex = data.workspaces.findIndex(w => w.id === wid);
    if(workspaceIndex >= 0){
      const channels = data.workspaces[workspaceIndex].channels;
      this.setState({channels: channels, showWorkspaces: false,
        showChannels: true});
    }
  }

  render() {
    return (
    <div>
      <section id="workspaceParentContainer">
        {this.state.showWorkspaces && <WorkspaceContainer workspaces={this.state.workspaces} openWorkspace={this.openWorkspace}></WorkspaceContainer>}
      </section>
      <section id="channelParentContainer">
        {this.state.showChannels && <ChannelCointainer channels={this.state.channels} showWorkspaces={this.showWorkspaces}></ChannelCointainer>}
      </section>
    </div>
    );
  }
}

export default App;
 