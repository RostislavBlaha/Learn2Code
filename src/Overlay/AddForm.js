import React, { Component } from 'react'
import URL from './URL'
import CardList from '../List/CardList'

export default class AddForm extends Component {  
  render() {
    return (
            <div className="addForm">
                <h2>Přidat záložku</h2>
                <URL onSubmit= {this.props.onAdd}
                     onHide= {this.props.onHide}/>
                <CardList  showAdd ={false}
                            canDelete= {false}
                            data = {this.props.website} 
                            onDelete = {function(){}}
                            cardDragOver = {function(){}}
                            cardDragStart = {function(){}}
                            cardRightClick = {function(){}}
                            dropCard = {function(){}}
                            onUndelete = {function(){}}
                            openFolder = {function(){}}
                            moveToFolder = {function(){}}/>          
            </div>
    )
  }
}