import React, { Component } from 'react';
import SendMessage from './SendMessage';
import Message from './Message';

class MessagesHistory extends Component {
constructor(props){
    super(props);
    this.state = {
        channel: props.channel,
        messages: props.channel.messages
    };
    this.submitMessage = this.submitMessage.bind(this);
}

submitMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({messages: messages});
    this.props.saveMessages(this.state.channel.id, this.state.messages);
}

  render() {
    return (
        <div className="channelMessages" id={`messageContainer${this.state.channel.id}`}>
            <div className="messageContainer">
            {
                
                  this.state.messages.map( (message, index) => {
                    return <Message key={index} message={message}></Message>
                    })
                    
            }
            </div>
            <SendMessage channel={this.state.channel} submitMessage={this.submitMessage}></SendMessage>
        </div>
    );
  }
}

export default MessagesHistory;
