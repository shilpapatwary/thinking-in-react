import React, { Component } from 'react';
import MessagesHistory from './MessagesHistory';

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
        <MessagesHistory channel={this.state.selectedChannel} key={this.state.selectedChannel.id} saveMessages={this.props.saveMessages}></MessagesHistory>
     </div>
    );
  }
}

export default MessageContainer;
