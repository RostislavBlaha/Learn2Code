import React, { Component } from 'react'


export default class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {  hover : false,
                        invisible: false,
                        canDelete: this.props.canDelete,
                        active:false
                     }
    }
    
    /*Hover*/
    mouseOver(){this.setState({hover : true})}
    mouseOut(){this.setState({hover: false})}
    
    /*Kartička s kterou táhnu*/
    
    dragStart(evt){
        evt.stopPropagation()
        this.props.cardDragStart(this.props.card.id)
        this.setState({hover : false})
    }
    
    dragEnd(evt){
        evt.stopPropagation()
        this.props.dropCard()
    }
    
    /*Kartička přes kterou táhnu*/
    cardDragOver(evt){
        evt.preventDefault() 
        evt.stopPropagation()
        this.props.cardDragOver(this.props.card.id)
        this.setState({invisible: true})
    }
    cardDragOn(evt){
        evt.preventDefault() 
        evt.stopPropagation()
        this.setState({active: true})
    }

    dragLeave(evt){  
        evt.stopPropagation()
        this.setState({ invisible: false,
                        active: false})
    }
    
    dragDrop(evt){ 
        evt.stopPropagation()
        this.props.dropCard()
        this.setState({invisible: false,
                        active: false})
    }
    
    moveToFolder(evt){
        evt.preventDefault()
        evt.stopPropagation()
        this.props.moveToFolder(this.props.card)
        this.setState({invisible: false,
                        active: false})
    }
    
    handleClick(evt){
        evt.preventDefault()
        evt.stopPropagation()
        this.props.onDelete(this.props.card.id)
    }
    
    openFolder(evt){
        evt.preventDefault()
        this.props.openFolder(this.props.card.id)
    }
    
    handleUndelete(evt){
        evt.preventDefault()
        evt.stopPropagation()
        this.props.onUndelete(this.props.card.id)
    }
    
    contextMenu(evt){
        evt.preventDefault()
        this.props.cardRightClick(evt, this.props.card.id, this.props.card.url)
        console.log(this)
    }
    
    render() {
        
        var cross
        if (this.props.canDelete){
            cross = (
                    <div>
                        <div    className="crossWraper" 
                                onClick={this.handleClick.bind(this)}>
                            <img    src="./src/cross.svg" 
                                    className="cross"/>
                        </div>
                        <div    className="crossWraper" 
                                onClick={this.handleUndelete.bind(this)}>
                            <img    src="./src/undelete.svg" 
                                    className="undelete"/>
                        </div>
                    </div>
                )          
        } else {
            if (this.state.hover){
                cross = (
                    <div    className="crossWraper" 
                            onClick={this.handleClick.bind(this)}>
                        <img    src="./src/cross.svg" 
                                className="cross"/>
                    </div>
                )   
            }
        }
        
        var cardClass
        
        return (
          <a href = {this.props.card.url}
             onClick={(this.props.card.type=="folder" ? this.openFolder.bind(this) : "")}>
              <div  className={(this.state.invisible ? "card invisible" : "card")} 
              
                    draggable="true"
                    
                    onMouseOver={this.mouseOver.bind(this)}
                    onMouseLeave={this.mouseOut.bind(this)}
                    onContextMenu={this.contextMenu.bind(this)}
              
                    onDragStart={this.dragStart.bind(this)}
                    onDragEnd={this.dragEnd.bind(this)}
                    
                    onDragOver={this.cardDragOn.bind(this)}
                    onDragLeave={this.dragLeave.bind(this)}
                    onDrop={this.moveToFolder.bind(this)}>
                    
                  <div  className={(this.state.active ? "img active" : "img")}
                        style = {{backgroundImage: "url(" + this.props.card.img + ")"}}>
                    {cross}
                    <div className="dangerZone"
                         onDragOver={this.cardDragOver.bind(this)}
                         onDrop={this.dragDrop.bind(this)}>
                    </div>
                  </div>
                  
                  <div className="name">  
                    {this.props.card.name}     
                  </div>
                  
              </div>
          </a>
        )
    
    }
}
