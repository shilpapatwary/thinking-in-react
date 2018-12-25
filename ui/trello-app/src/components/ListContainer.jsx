import React, { Component } from 'react';
import Lists from './Lists';

class ListContainer  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board

        }
        this.addListToWorkspace = this.addListToWorkspace.bind(this);
        this.showBoards = this.showBoards.bind(this);
        this.addCardToList = this.addCardToList.bind(this);

    }

    addListToWorkspace(wid, list) {
        this.props.onAddList(wid, list);
    }

    showBoards() {
        this.props.showBoards();
    }
    
    addCardToList(lid, bid, card){
        this.props.addCardToList(lid, bid, card);
    }

    render(props) {
      return (
        <section id='Lists'>
            <section className="breadcrumb">
                <span id="linkBoards" onClick={this.showBoards}>Back to boards</span>
            </section>
            <section id={this.state.board.id} className="listSection">
                <Lists lists={this.state.board.lists} addCardToList={this.addCardToList} addListToWorkspace={this.addListToWorkspace}></Lists> 
            </section>
    </section>
      );
    }
  }
  
  export default ListContainer;