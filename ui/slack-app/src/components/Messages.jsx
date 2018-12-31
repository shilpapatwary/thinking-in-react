import React, { Component } from 'react';

class Messages extends Component {
constructor(props){
    super(props);
    this.state = {
        channel: props.channel,
        messages: props.channel.messages,
        inputText:""
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
}

submitMessage(event) {
    event.preventDefault();
    const messages = this.state.messages;
    messages.push(document.getElementById(`message${this.state.channel.id}`).value);
    this.setState({messages: messages, inputText:''});
    this.props.saveMessages(this.state.channel.id, this.state.messages);
}

handleInputChange(event) {
    this.setState({inputText: event.target.value});
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
            </div>
            <div className="inputContainer">
                <form id={`messageForm${this.state.channel.id}`} data-id={this.state.channel.id}>
                    <input type="text" id={`message${this.state.channel.id}`} name="message" value={this.state.inputText} className="messageInput" onChange={this.handleInputChange}/>
                    <button className="submitMessage" id={`submit${this.state.channel.id}`} onClick={this.submitMessage}>Enter</button>
                </form>
            </div>
        </div>
    );
  }
}

export default Messages;
