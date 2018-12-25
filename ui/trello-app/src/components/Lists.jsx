import React, { Component } from 'react';
import Card from './Card';

class Lists  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: props.lists
        }
        this.addListToWorkspace = this.addListToWorkspace.bind(this);
        this.addCardToList = this.addCardToList.bind(this);
    }

    addListToWorkspace(event) {
        const wid = event.target.closest('.listSection').id;
        const newList = {
            id: Math.floor(Math.random() * 100000),
            name: 'sample List'
        }
        this.props.addListToWorkspace(wid, newList);
    }

    addCardToList(event) {
        const listId = event.target.closest('.list').id;
        const boardId = event.target.closest('.listSection').id;
        this.props.addCardToList(listId, boardId, {
            id: Math.floor(Math.random() * 100000),
            name: ' sample card'
        });
    }

    render(props) {
      return (
        <div>
             <div className="addList">
                <span id="addList" onClick={this.addListToWorkspace}>+ Add a list</span>
                    <form id="addListForm" className="hidden">
                    <input id="listTitle" type="text" name="listTitle" defaultValue=""/>
                        <button className="listSubmit">Submit</button>
                </form>
            </div>
            <div className="boardLists">
                {
                this.state.lists.map(list => {
                        return  <div id={list.id} key={list.id} className="list">
                                    <div className="listTitle">{list.name}</div>
                                    <div className="cards">{
                                        list.cards.map( (card) => {
                                            return <Card card={card}></Card>
                                        })
                                    }</div>
                                    <div className="addCard" onClick={this.addCardToList}>+ Add card</div>
                                </div>
                    })
                }      
            </div>
        </div>
      );
    }
  }
  
  export default Lists;