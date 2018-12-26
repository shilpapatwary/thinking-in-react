import React, { Component } from 'react';

class Workspace extends Component {
 constructor(props){
     super(props);
     this.state={
         workspace: props.workspace
     };
     this.openWorkspace = this.openWorkspace.bind(this);
 }

 openWorkspace() {
     this.props.openWorkspace(this.state.workspace.id);
 }
  render() {
    return (
    <li id={this.state.workspace.id} className='workspace'>
      <input type="text" className="workspaceTitle" value={this.state.workspace.name}/>
      <i className="fa fa-plus-square addChannel" id={`addChannel${this.state.workspace.id}`}></i>
      <i className="fa fa-user-plus addUser" id={`addUser${this.state.workspace.id}`}></i>  
      <i id={`update${this.state.workspace.id}`} className="fa fa-edit updateWorkspace"></i>
      <i className="fa fa-trash deleteWorkspace"></i>
      <i className="fa fa-sign-in openWorkspace" onClick={this.openWorkspace}></i>
     </li>
    );
  }
}

export default Workspace;
