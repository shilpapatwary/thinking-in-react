import React, { Component } from 'react';
import Workspace from './Workspace';

class workspaceContainer extends Component {
constructor(props) {
    super(props);
    this.state = {
        workspaces: props.workspaces
    }
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
                                            return <Workspace workspace={workspace} key={workspace.id} openWorkspace={this.props.openWorkspace}></Workspace>
                                        })
                                    }
                                    <li id="addWorkspace" className="workspace">+ Add a workspace</li>
                                </ul>
                        </section>
            </section>
            <section className="hidden" id="addUserForm">
                    <form id="addUserToWorkspace">
                        <input type="text" id="workspaceUser" className="userInput" placeholder="User Name"/>
                        <input type="submit" id="submitWorkspaceUser"/>
                    </form>
            </section>
      </section>
    );
  }
}

export default workspaceContainer;
