/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';

class Card  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: props.card,
            cardName: props.card.name
        }
        this.setCardName = this.setCardName.bind(this);
        this.editCardName = this.editCardName.bind(this);
    }

    setCardName(event) {
        this.setState({cardName: event.target.value});
    }

    editCardName(event) {
        this.props.editCardName(this.state.card.id, this.state.cardName);
    }

    render(props) {
      return (
        <div className="card" id={this.state.card.id}>
            <span className="cardTitle"><input type='text' value={this.state.cardName} onKeyDown={this.editCardName} onChange={this.setCardName} /></span>
        </div>
      );
    }
  }
  
  export default Card;