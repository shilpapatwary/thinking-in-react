import React, { Component } from 'react';
import BoardContainer from './BoardContainer';
import ListContainer from './ListContainer';

const data = require('../boards.json');

class Home  extends Component {
  constructor () {
    super ();
    this.state = {
      boards: data.boards,
      selectedBoard: {lists:[]},
      showBoards: true,
      showLists: false
    };
    this.setSelectedBoard = this.setSelectedBoard.bind(this);
  }

  setSelectedBoard(board) {
    this.setState({
      selectedBoard: board,
      showBoards: false,
      showLists: true
    });
  }
    render() {
      return (
        <div className="rootContainer">
          <header>
            <section><h2>Trello</h2></section>
            <section className="addboard"><span className="info">Create a Board</span><span id="createBoardIcon">+</span></section>
          </header>
          <section id="content">
            { this.state.showBoards ? <BoardContainer boards={this.state.boards} setSelectedBoard={this.setSelectedBoard}></BoardContainer> : null}
            { this.state.showLists ? <ListContainer board={this.state.selectedBoard}></ListContainer> : null }
          </section>
        </div>
      );
    }
  }
  
  export default Home;