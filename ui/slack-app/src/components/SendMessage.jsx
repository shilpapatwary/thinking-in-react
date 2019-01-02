import React, { Component } from 'react';

class SendMessage extends Component {
constructor(props){
    super(props);
    this.state = {
        channel: props.channel,
        inputText:""
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
}

submitMessage(event) {
    event.preventDefault();
    this.props.submitMessage(document.getElementById(`message${this.state.channel.id}`).value);
    this.setState({inputText:''});
}

handleInputChange(event) {
    this.setState({inputText: event.target.value});
}
  render() {
    return (
        <div className="inputContainer">
                <form id={`messageForm${this.state.channel.id}`} data-id={this.state.channel.id}>
                    <input type="text" id={`message${this.state.channel.id}`} name="message" value={this.state.inputText} className="messageInput" onChange={this.handleInputChange}/>
                    <button className="submitMessage" id={`submit${this.state.channel.id}`} onClick={this.submitMessage}>Enter</button>
                </form>
        </div>
    );
  }
}

export default SendMessage;
