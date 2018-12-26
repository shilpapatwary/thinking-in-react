import React, { Component } from 'react';
import List from './List';

class Lists  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: props.lists
        }
        this.selectedList = '';
        this.addListToBoard = this.addListToBoard.bind(this);
        this.setListId = this.setListId.bind(this);
        this.setListName = this.setListName.bind(this);
    }

    addListToBoard(event) {
        const newList = {
            id: Math.floor(Math.random() * 100000),
            name: 'sample List',
            cards:[]
        }
        this.props.addListToBoard(newList);
    }

    setListName(e) {
        this.setState({listName: e.target.value});
    }

    setListId(event) {
        this.setState({selectedList: event.target.closest('.list').id});
    }

    render(props) {
      return (
        <div>
             <div className="addList">
                <span id="addList" onClick={this.addListToBoard}>+ Add a list</span>
                    <form id="addListForm" className="hidden">
                    <input id="listTitle" type="text" name="listTitle" defaultValue=""/>
                        <button className="listSubmit">Submit</button>
                </form>
            </div>
            <div className="boardLists">
                {
                this.state.lists.map( (list, index) => {
                        return  <List key={index} list={list} addCardToList={this.props.addCardToList} editListName={this.props.editListName} editCardName={this.props.editCardName}></List>
                    })
                }      
            </div>
        </div>
      );
    }
  }
  
  export default Lists;