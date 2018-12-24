import React, { Component } from 'react';
import Board from './Board';

class BoardContainer  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: props.boards
        }
        this.setSelectedBoard = this.setSelectedBoard.bind(this);
    }

    updateBoardName(event) {
        console.log(event.target.id);
    }

    setSelectedBoard(board){
        this.props.setSelectedBoard(board);
    }
    
    render(props) {
      return (
        <section id="boards">
            <ul id="boardsContainer">
            {
            this.state.boards.map(board => {
                return <Board board={board} key={board.id} onBoardSelect={this.setSelectedBoard}/>
            })
            }  
            </ul>
        </section>
      );
    }
  }
  
  export default BoardContainer;