import React, { Component } from 'react';

class Channel extends Component {
constructor(props){
    super(props);
    this.state={
        channel: props.channel,
        showUserList: false
    };
    this.setSelectedChannel = this.setSelectedChannel.bind(this);
    this.listUsers = this.listUsers.bind(this);
    this.closeUserList = this.closeUserList.bind(this);
}

setSelectedChannel() {
    this.props.setSelectedChannel(this.state.channel);
}

listUsers() {
    this.setState({showUserList: true});
}

closeUserList(){
    this.setState({showUserList: false});
}
  render() {
    return (
        <li className="channel" id={this.state.channel.id} data-wid={this.state.channel.id} onClick={this.setSelectedChannel}>
        <form id={`channelUpdate${this.state.channel.id}`}>
         <div className="channelHeader">
            <span className="channelTitle">{this.state.channel.name}</span>
            <input type="text" id={`channelUser${this.state.channel.id}`} />
            <i className="fa fa-user-plus addChannelUser" id={`addUser${this.state.channel.id}`}></i>
            <i className="fa fa-users listUsers" id={`listUser${this.state.channel.id}`} onClick={this.listUsers}></i>
         </div>
        </form>
        {this.state.showUserList && <section className="userListDialog">
            <div><i className="fa fa-close closeUserDialog" onClick={this.closeUserList}></i></div>
            {this.state.channel.users.map( (user) =>  {
                return <div key={user.id}>{user.name}</div>
            })}
        </section>}
    </li>
    );
  }
}

export default Channel;
