import React, { Component } from 'react';
import Channel from './Channel';

class channelsContainer extends Component {
 constructor(props){
     super(props);
     this.state = {
         channels: props.channels,
         selectedChannel:{}
     }
     this.setSelectedChannel = this.setSelectedChannel.bind(this);

 }

 setSelectedChannel(channel) {
     this.setState({selectedChannel: channel});
 }
  render() {
    return (
        <section>
            <header>
                <section><h3 className="backButton" onClick={this.props.showWorkspaces}><i className="fa fa-arrow-left"></i>Back To Workspaces</h3></section>
            </header>
            <section className="mainSection">
                <div className="channelsSection">
                    <div className="channelHeaderSection"><span >Channels </span><i className="fa fa-plus-square addChannel"></i></div>
                    <ul id="channelsContainer">
                             {
                                this.state.channels.map(channel => {
                                    return <Channel key={channel.id} channel={channel} setSelectedChannel={this.setSelectedChannel}></Channel>
                                })
                            }
                    </ul>    
                </div>
                <div className="messageSection" id="msgSec">
                        <h2 className='channelHeaderName'>{this.state.selectedChannel.name}</h2>
                </div>
                
            </section>
            <section id="userListDialog" className="hidden"></section>
    </section>
    );
  }
}

export default channelsContainer;
