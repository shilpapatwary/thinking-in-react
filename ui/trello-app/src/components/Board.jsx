import React, { Component } from 'react';

class Board  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board
        }
        this.updateBoardName = this.updateBoardName.bind(this);
        this.getBoardDetails = this.getBoardDetails.bind(this);
    }

    updateBoardName(event) {
        console.log(event.target.id);
    }

    getBoardDetails(event) {
        this.props.onBoardSelect(this.state.board);
        console.log(this.state.board);
    }
    render(props) {
      return (
            <li className="board" id={this.state.board.id}>
                <form id={`boardUpdate${this.state.board.id}`}>
                    <div className="boardHeader">
                            <input type="text" id={`boardTitle${this.state.board.id}`} className="boardTitle" defaultValue={this.state.board.name}/>
                            <span id={`update${this.state.board.id}`} className="updateboard" onClick={this.updateBoardName}>✓</span>
                            <span className="deleteboard">X</span>
                    </div>  
                    <div className="boardBody" onClick={this.getBoardDetails}></div>
                </form>
            </li>
      );
    }
  }
  
  export default Board;