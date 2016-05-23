import React, { Component } from 'react'
import URL from './URL'
import CardList from '../List/CardList'

export default class EditForm extends Component {   
  render() {
    var website = this.props.website.slice(0,8)
    return (
            <div className="addForm">
                <h2>Upravit záložku</h2>
                <URL onSubmit= {this.props.onAdd}
                     onHide= {this.props.onHide}
                     url = {this.props.url}/>   
                <CardList  showAdd ={false}
                            canDelete= {false}
                            data = {website} 
                            onDelete = {this.props.onRefuse}
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