import React, { Component } from 'react';
import Channel from './Channel';
import Messages from './Messages';

class channelsContainer extends Component {
 constructor(props){
     super(props);
     this.state = {
         channels: props.channels,
         users: props.users,
         selectedChannel:props.channels[0],
         showChannelForm: false,
         showMessageSection: true,
         showUserForm: false,
         hasChannels: props.channels.length > 0
     }
     this.setSelectedChannel = this.setSelectedChannel.bind(this);
     this.addChannelToWorkspace = this.addChannelToWorkspace.bind(this);
     this.openChannelForm = this.openChannelForm.bind(this);
     this.openUserForm = this.openUserForm.bind(this);
     this.startUserThread = this.startUserThread.bind(this);
 }

 addChannelToWorkspace(event) {
     event.preventDefault();
    this.props.onAddChannel({
        id: `channel${Math.floor(Math.random() * 100000)}`,
        name: document.getElementById('workspaceChannel').value,
        users:[]
    });
    this.setState({showChannelForm: false,
        showMessageSection: true})
 }

 openChannelForm() {
     this.setState({ showChannelForm: true,
        showMessageSection: false})
 }

 setSelectedChannel(channel) {
     this.setState({selectedChannel: channel});
 }
 
 openUserForm() {
    this.setState({ showChannelForm: false,
        showMessageSection: false,showUserForm: true})
 }

 startUserThread(event){
     event.preventDefault();
     this.props.onUserThreadStart(document.getElementById('workspaceUsername').value);
     this.setState({showChannelForm: false, showUserForm: false,
        showMessageSection: true})
 }
  render() {
    return (
        <section id="channelSectionContainer">
            <header>
                <section><h3 className="backButton" onClick={this.props.showWorkspaces}><i className="fa fa-arrow-left"></i>Back To Workspaces</h3></section>
            </header>
            <section className="mainSection">
                <div className="channelsSection">
                    <div className="channelHeaderSection"><span >Channels </span><i className="fa fa-plus-square addChannel" onClick={this.openChannelForm}></i></div>
                    <ul id="channelsContainer">
                             {
                                this.state.channels.map(channel => {
                                    return <Channel key={channel.id} channel={channel} setSelectedChannel={this.setSelectedChannel}></Channel>
                                })
                            }
                    </ul>  
                    <div className="channelHeaderSection"><span >Direct Messages </span><i className="fa fa-plus-square" onClick={this.openUserForm}></i></div>
                    <ul id="usersThreadContainer">
                             {
                                this.state.users.map(user => {
                                   return user.chat ? <li className="workspaceUser">{user.name}</li> : null;
                                })
                            }
                    </ul> 
                </div>
               {
                   this.state.showMessageSection && this.state.hasChannels &&
                   <div className="messageSection" id="msgSec">
                        <h2 className='channelHeaderName'>{this.state.selectedChannel.name}</h2>
                       <Messages channel={this.state.selectedChannel} key={this.state.selectedChannel.id} saveMessages={this.props.onMessageSent}></Messages>
                   </div>
               } 
                
            {
                this.state.showChannelForm && 
                <section id="addChannelForm">
                    <form id="addChannelToWorkspace">
                        <input type="text" id="workspaceChannel" className="channelInput" placeholder="Channel Name"/>
                        <input type="submit" id="submitWorkspaceChannel" onClick={this.addChannelToWorkspace}/>
                    </form>
                </section>
            }
            {
                this.state.showUserForm && 
                <section id="addUserForm">
                    <form>
                        <input type="text" id="workspaceUsername" className="userInput" placeholder="User Name"/>
                        <input type="submit" onClick={this.startUserThread}/>
                    </form>
            </section>
            }
                
            </section>
            <section id="userListDialog" className="hidden"></section>
    </section>
    );
  }
}

export default channelsContainer;
