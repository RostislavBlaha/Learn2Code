import React, { Component } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {cardState : 'default'};
    }
    
    mouseOver(){
        this.setState({cardState : 'hover'});
    }
    
    mouseOut(){
        this.setState({cardState : 'default'});
    }
    
    dragOver(evt){
        evt.preventDefault();
        this.setState({cardState : 'moved'});
        console.log(this.props.card.id + this.state.cardState);
    }
    
    handleClick(evt){
        evt.preventDefault();
        this.props.onDelete(this.props.card.id);
    }
    
    render() {
        
        var cross;
        if (this.state.cardState == 'hover'){
            cross = (
                <div    className="crossWraper" 
                        onClick={this.handleClick.bind(this)}>
                    <img    src="./src/cross.svg" 
                            className="cross"/>
                </div>
            );
            
        }
        
        var cardClass;
        
        return (
          <a href = {this.props.card.url}>
              <div  className={(this.state.cardState == "moved" ? "card moved" : "card")} 
                    onMouseOver={this.mouseOver.bind(this)} 
                    onMouseLeave={this.mouseOut.bind(this)}
                    draggable="true"
                    onDragOver={this.dragOver.bind(this)}
                    onDragLeave={this.mouseOut.bind(this)}>
                  <div className="img">
                    {cross}
                  </div>
                  <div className="name">  
                    {this.props.card.name}     
                  </div>
              </div>
          </a>
        );
    
    }
}
