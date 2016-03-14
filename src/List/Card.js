import React, { Component } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {  hover : false,
                        invisible: false,
                        contextMenu: false,
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
    
    handleMouseUp(evt){
        if (evt.button==2) {
            evt.preventDefault();
            evt.stopPropagation();
            console.log("bif");
        }
    }
    
    contextMenu(evt){
        evt.preventDefault();
        console.log(evt.clientX + "," + evt.clientY);
        this.setState({contextMenu : true});
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
    
        var contextMenu;
    
        if (this.state.contextMenu){
            contextMenu = (            
                <div className="contextMenu">
                    <ul>
                        <li className="menuItem">Upravit</li>
                        <li className="menuItem">Přesunout do koše</li>
                    </ul>
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
                    onMouseDown={this.handleMouseUp.bind(this)}
              
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
                    {contextMenu}
                  
              </div>
          </a>
        );
    
    }
}
