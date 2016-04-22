import React, { Component } from 'react'
import CardList from '../List/CardList'

export default class Folder extends Component {   
  render() {
    var data = this.props.data
    var onKeyDown = this.props.onKeyDown
    var onDelete = this.props.onDelete
    var cardDragOver = this.props.cardDragOver
    var cardDragStart = this.props.cardDragStart
    var dropCard = this.props.dropCard
    var undeleteCard = this.props.onUndelete
    var cardRightClick = this.props.cardRightClick
    var name = this.props.name
    
    return (
            <div className = "folder">
                <h2>{name}</h2>
                <CardList   canDelete= "true"
                            onKeyDown={onKeyDown}
                            data = {data} 
                            onDelete = {onDelete}
                            cardDragOver = {cardDragOver}
                            cardDragStart = {cardDragStart}
                            cardRightClick = {cardRightClick}
                            dropCard = {dropCard}
                            onUndelete = {undeleteCard}/>

        </div>
    )
  }
}