import React, { Component } from 'react'
import CardList from '../List/CardList'

export default class Trash extends Component {   
  render() {
    var data = this.props.data
    var onKeyDown = this.props.onKeyDown
    var onDelete = this.props.onDelete
    var cardDragOver = this.props.cardDragOver
    var cardDragStart = this.props.cardDragStart
    var dropCard = this.props.dropCard
    var undeleteCard = this.props.onUndelete
    return (
            <div className = "trash">
                <h2>Koš</h2>
                <CardList   canDelete= "true"
                            onKeyDown={onKeyDown}
                            data = {data} 
                            onDelete = {onDelete}
                            cardDragOver = {cardDragOver}
                            cardDragStart = {cardDragStart}
                            dropCard = {dropCard}
                            onUndelete = {undeleteCard}/>
            </div>
    )
  }
}