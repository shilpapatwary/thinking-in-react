import React, { Component } from 'react';
import Messages from './Messages';

class MessageContainer extends Component {
 constructor(props){
     super(props);
     this.state = {
        selectedChannel:props.selectedChannel
     }
 }

  render() {
    return (
    <div className="messageSection" id="msgSec">
        <h2 className='channelHeaderName'>{this.state.selectedChannel.name}</h2>
        <Messages channel={this.state.selectedChannel} key={this.state.selectedChannel.id} saveMessages={this.props.saveMessages}></Messages>
     </div>
    );
  }
}

export default MessageContainer;
