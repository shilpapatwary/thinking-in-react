import React, { Component } from 'react';

class Messages extends Component {
constructor(props){
    super(props);
    this.state = {
        channel: props.channel,
        messages: props.channel.messages
    };
    this.submitMessage = this.submitMessage.bind(this);
}

submitMessage(event) {
    event.preventDefault();
    const messages = this.state.messages;
    messages.push(document.getElementById(`message${this.state.channel.id}`).value);
    this.setState({messages: messages});
    this.props.saveMessages(this.state.channel.id, this.state.messages);
}

  render() {
    return (
        <div className="channelMessages" id={`messageContainer${this.state.channel.id}`}>
            <div className="messageContainer">
            {
                
                  this.state.messages.map( (message, index) => {
                    return <div key={index}>{message}</div>
                    })
                    
            }
            {console.log("constructing nessages", this.state.channel)}
            </div>
            <div className="inputContainer">
                <form id={`messageForm${this.state.channel.id}`} data-id={this.state.channel.id}>
                    <input type="text" id={`message${this.state.channel.id}`} name="message" className="messageInput" />
                    <button className="submitMessage" id={`submit${this.state.channel.id}`} onClick={this.submitMessage}>Enter</button>
                </form>
            </div>
        </div>
    );
  }
}

export default Messages;
