import React, { Component } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {  hover : false,
                        dragged: false};
    }
    
    /*Hover*/
    mouseOver(){this.setState({hover : true})}
    mouseOut(){this.setState({hover: false})}
    
    /*Kartička s kterou táhnu*/
    
    dragStart(evt){
        evt.stopPropagation();
        this.props.cardDragStart(this.props.card.id);
        this.setState({hover : false});
    }
    dragEnd(evt){
        evt.stopPropagation();
        this.props.dropCard();
    }
    
    /*Kartička přes kterou táhnu*/
    dragOver(evt){
    evt.preventDefault();  
    evt.stopPropagation();
        this.props.cardDragOver(this.props.card.id);
        //this.setState({dragged: true});
        console.log("Jsem na kartičce");
    }

    dragLeave(evt){  
        evt.stopPropagation();
        //this.setState({dragged: false});
        console.log("Opustil jsem kartičku " + this.props.card.name);
    }
    
    dragDrop(evt){ 
        evt.stopPropagation();
        this.props.dropCard();
        this.setState({dragged: false});
    }
    
    handleClick(evt){
        evt.preventDefault();
        this.props.onDelete(this.props.card.id);
    }
    
    render() {
        
        var cross;
        if (this.state.hover){
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
              <div  className={(this.state.dragged ? "card moved" : "card")} 
              
                    draggable="true"
                    
                    onMouseOver={this.mouseOver.bind(this)} 
                    onMouseLeave={this.mouseOut.bind(this)}
              
                    onDragStart={this.dragStart.bind(this)}
                    onDragEnd={this.dragEnd.bind(this)}
                    
                    onDragOver={this.dragOver.bind(this)}
                    onDragLeave={this.dragLeave.bind(this)}
                    onDrop={this.dragDrop.bind(this)}>
                    
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
