import React, { Component } from 'react';


export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {  hover : false,
                        invisible: false,
                     };
    }
    
    /*Hover*/
    mouseOver(){
        this.setState({hover : true});
        console.log(this.state.contextMenu);
    
    }
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
        this.setState({invisible: true});
    }

    dragLeave(evt){  
        evt.stopPropagation();
        this.setState({invisible: false});
    }
    
    dragDrop(evt){ 
        evt.stopPropagation();
        this.props.dropCard();
        this.setState({invisible: false});
    }
    
    handleClick(evt){
        evt.preventDefault();
        this.props.onDelete(this.props.card.id);
    }
    
    contextMenu(evt){
        evt.preventDefault();
        this.props.cardRightClick(evt);
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
              <div  className={(this.state.invisible ? "card invisible" : "card")} 
              
                    draggable="true"
                    
                    onMouseOver={this.mouseOver.bind(this)} 
                    onMouseLeave={this.mouseOut.bind(this)}
                    onContextMenu={this.contextMenu.bind(this)}
              
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
