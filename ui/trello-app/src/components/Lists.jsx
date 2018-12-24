import React, { Component } from 'react';

class Lists  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: props.lists
        }
    }

    render(props) {
      return (
        <div>
             <div className="addList">
                <span id="addList">+ Add a list</span>
                    <form id="addListForm" className="hidden">
                    <input id="listTitle" type="text" name="listTitle" defaultValue=""/>
                        <button className="listSubmit">Submit</button>
                </form>
            </div>
            <div className="boardLists">
                {
                this.state.lists.map(list => {
                        return  <div id={list.id} className="list">
                                    <div className="listTitle">List1</div>
                                    <div className="addCard">+ Add card</div>
                                </div>
                    })
                }      
            </div>
        </div>
      );
    }
  }
  
  export default Lists;