/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';

class Board  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board,
            successClass: props.showSuccess ? 'success' : ''
        }
        this.updateBoardName = this.updateBoardName.bind(this);
        this.getBoardDetails = this.getBoardDetails.bind(this);
    }

    getBoardDetails(event) {
        this.props.onBoardSelect(this.state.board);
    }

    updateBoardName(event) {
        const updateBoard = this.state.board;
        updateBoard.name =  document.getElementById(`{boardTitle${this.state.board.id}}`);
        this.props.onBoardUpdate(updateBoard);
    }

    render(props) {
      return (
            <li className="board" id={this.state.board.id}>
                <form id={`boardUpdate${this.state.board.id}`}>
                    <div className="boardHeader">
                            <input type="text" id={`boardTitle${this.state.board.id}`} className="boardTitle" defaultValue={this.state.board.name}/>
                            <span id={`update${this.state.board.id}`} className={`updateboard ${this.state.successClass} `} onClick={this.updateBoardName}>✓</span>
                            <span className="deleteboard">X</span>
                    </div>  
                    <div className="boardBody" onClick={this.getBoardDetails}></div>
                </form>
            </li>
      );
    }
  }
  
  export default Board;