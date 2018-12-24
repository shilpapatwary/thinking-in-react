import React, { Component } from 'react';
import Board from './Board';

class BoardContainer  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: props.boards
        }
        this.setSelectedBoard = this.setSelectedBoard.bind(this);
        this.updateSelectedBoard = this.updateSelectedBoard.bind(this);
    }

    setSelectedBoard(board){
        this.props.setSelectedBoard(board);
    }

    updateSelectedBoard(board) {
        this.props.updateBoard(board);
    }
    
    render(props) {
      return (
        <section id="boards">
            <ul id="boardsContainer">
            {
            this.state.boards.map(board => {
                return <Board board={board} key={board.id} 
                showSuccess={this.props.showSuccess} onBoardSelect={this.setSelectedBoard} onBoardUpdate={this.updateSelectedBoard}/>
            })
            }  
            </ul>
        </section>
      );
    }
  }
  
  export default BoardContainer;