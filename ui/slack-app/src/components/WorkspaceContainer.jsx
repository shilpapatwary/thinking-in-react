import React, { Component } from 'react';
import Workspace from './Workspace';

class workspaceContainer extends Component {
constructor(props) {
    super(props);
    this.state = {
        workspaces: props.workspaces,
        showUserForm: false,
        selectedWorkspace: ''
    }
    this.addWorkspace = this.addWorkspace.bind(this);
    this.openAddUserForm = this.openAddUserForm.bind(this);
    this.addUserToWorkspace = this.addUserToWorkspace.bind(this);
}

addWorkspace() {
    const workspaceData ={
        id: Math.floor(Math.random() * 100000),
        name: 'My Workspace',
        users: [],
        channels: [],
      };
      this.props.addWorkspace(workspaceData);
}

openAddUserForm(wid) {
    this.setState({selectedWorkspace: wid, showUserForm: true});
}

addUserToWorkspace(event){
    event.preventDefault();
    const newUser = {
            id: `user${Math.floor(Math.random() * 100000)}`,
            name: document.getElementById('workspaceUser').value,
            chat: false,
            threads: []
    }
    this.props.onAddUserToWorkspace(this.state.selectedWorkspace, newUser);
    this.setState({showUserForm: false});
}
  render(props) {
    return (
        <section>
            <header>
                        <section id="workspaceHeader"><h2>My Workspaces</h2></section>
            </header>
            <section id="content">
                        <section id="workspaces">
                                <ul id="workspaceContainer">
                                    {
                                        this.state.workspaces.map( workspace => {
                                            return <Workspace workspace={workspace} key={workspace.id}  openWorkspace={this.props.openWorkspace} onWorkspaceTitleChange={this.props.onWorkspaceTitleChange} openAddUserForm={this.openAddUserForm} deleteWorkspace={this.props.deleteWorkspace}></Workspace>
                                        })
                                    }
                                    <li id="addWorkspace" className="workspace" onClick={this.addWorkspace}>+ Add a workspace</li>
                                </ul>
                        </section>
            </section>
           {
               this.state.showUserForm && <section id="addUserForm">
               <form id="addUserToWorkspace">
                   <input type="text" id="workspaceUser" className="userInput" placeholder="User Name"/>
                   <input type="submit" id="submitWorkspaceUser" onClick={this.addUserToWorkspace}/>
               </form>
       </section>
           } 
      </section>
    );
  }
}

export default workspaceContainer;
