import React, { Component } from 'react'
import CardList from '../List/CardList'

export default class Folder extends Component { 
  constructor(props) {
    super(props)
    this.state = {name: this.props.name}
  }  
  changeName(evt){
      evt.preventDefault()
      this.props.changeName(evt.target.innerHTML)
  }
  render() {
    var name 
    var data
    if (this.props.data.type == "folder"){
        name = (<h2 contentEditable = "true"
                    onInput = {this.changeName.bind(this)}
                    max = "20">
                    {this.state.name}
                </h2>)
        data = this.props.data.data
    }else{
        name = (<h2>{this.props.name}</h2>)
        data = this.props.data
    }
    
    
    return (
        <div>
            <div className = "folder">
                {name}
                <CardList   showAdd ={this.props.showAdd}
                            canDelete= {this.props.canDelete}
                            onKeyDown={this.props.onKeyDown}
                            data = {data} 
                            onDelete = {this.props.onDelete}
                            cardDragOver = {this.props.cardDragOver}
                            cardDragStart = {this.props.cardDragStart}
                            cardRightClick = {this.props.cardRightClick}
                            dropCard = {this.props.dropCard}
                            onUndelete = {this.props.onUndelete}
                            openFolder = {this.props.openFolder}
                            moveToFolder = {this.props.moveToFolder}/>
            
            </div>
            <div    className = "oZone"
                    onDrop = {this.props.topDrop}
                    onClick = {this.props.closeOverlay}>
            </div>
        </div>
    )
  }
}