import React, { Component } from 'react';
import Card from './Card';

class List  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            listName: props.list.name,
            listId: props.list.id
        }
        this.addCardToList = this.addCardToList.bind(this);
        this.editListName = this.editListName.bind(this);
        this.setListName = this.setListName.bind(this);
        this.editCardName = this.editCardName.bind(this);
    }

    addCardToList(event) {
        this.props.addCardToList(this.state.list.id, {
            id: `${Math.floor(Math.random() * 100000)}`,
            name: ' sample card'
        });
    }

    setListName(event) {
        this.setState({listName: event.target.value});
    }

    editListName(event) {
        if(event.keyCode === 13) {
            this.props.editListName(this.state.list.id, this.state.listName);
        }
    }

    editCardName(cid, name) {
        this.props.editCardName(this.state.list.id, cid, name);
    }

    render(props) {
      return (
        <div id={this.state.listId} className="list">
                                    <div className="listTitle"><input type='text' value={this.state.listName} onChange={this.setListName} onKeyDown={this.editListName}/></div>
                                    <div className="cards">{
                                        this.state.list.cards.map( (card) => {
                                            return <Card card={card} key={card.id} editCardName={this.editCardName}></Card>
                                        })
                                    }</div>
                                    <div className="addCard" onClick={this.addCardToList}>+ Add card</div>
                                </div>
      );
    }
  }
  
  export default List;