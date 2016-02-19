import React, { Component } from 'react';
import Card from './Card';
import Add from './Add';
import Overlay from '../Overlay/Overlay';
import AddForm from '../Overlay/AddForm';


export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {showNew: false};
  }
  showNew (){
    if (this.state.showNew){  
        this.setState({showNew: false});
    } else{
        this.setState({showNew: true});
    }  
  }
  render() { 
    var removeCard = this.props.onDelete;
    var listNodes = this.props.data.map(function(card){
        return (
        <Card key = {card.id} card={card} onDelete={removeCard}/>
        );
    });
    console.log(this.props.data);
    var newOverlay;
    if (this.state.showNew){
        newOverlay = (  
            <div>
                <AddForm/>
                <Overlay onClick={this.showNew.bind(this)}/>
            </div>
            );
    }                 
    return (
      <div>
          <div className="cardList">
            {listNodes}
            <Add onClick={this.showNew.bind(this)}/>
          </div>
            {newOverlay}
      </div>
    );
  }
}
