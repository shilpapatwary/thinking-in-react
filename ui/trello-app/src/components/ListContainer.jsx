import React, { Component } from 'react';
import Lists from './Lists';

class ListContainer  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board
        }
    }

    render(props) {
      return (
        <section id='Lists'>
            <section className="breadcrumb">
                <span id="linkBoards" onClick={this.props.showBoards}>Back to boards</span>
            </section>
            <section id={this.state.board.id} className="listSection">
                <Lists lists={this.state.board.lists} addCardToList={this.props.addCardToList} addListToBoard={this.props.onAddList} editListName={this.props.onlistNameEdited} editCardName={this.props.editCardName}></Lists> 
            </section>
    </section>
      );
    }
  }
  
  export default ListContainer;