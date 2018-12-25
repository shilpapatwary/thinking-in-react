/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';

class Card  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: props.card
        }
    }

    render(props) {
      return (
        <div className="card" id={this.state.card.id}>
            <span className="cardTitle">{this.state.card.name}</span>
        </div>
      );
    }
  }
  
  export default Card;