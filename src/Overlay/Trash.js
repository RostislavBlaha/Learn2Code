import React, { Component } from 'react'
import CardList from '../List/CardList'

export default class Trash extends Component {   
  render() {
    var data = this.props.data
    var onKeyDown = this.props.onKeyDown
    var onDelete = this.props.onDelete
    var cardDragOver = this.props.cardDragOver
    var cardDragStart = this.props.cardDragStart
    var cardRightClick = this.props.cardRightClick
    var dropCard = this.props.dropCard
    return (
            <div className = "trash">
                <h2>Koš</h2>
                <CardList   onKeyDown={onKeyDown}
                            data = {data} 
                            onDelete = {onDelete}
                            cardDragOver = {cardDragOver}
                            cardDragStart = {cardDragStart}
                            cardRightClick = {cardRightClick}
                            dropCard = {dropCard}/>
            </div>
    )
  }
}