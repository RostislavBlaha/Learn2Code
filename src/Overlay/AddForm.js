import React, { Component } from 'react'
import URL from './URL'
import CardList from '../List/CardList'

export default class AddForm extends Component {  
  render() {
    console.log(this.props.website)
    var website = this.props.website.slice(0,8)
    return (
            <div className="addForm">
                <h2>Přidat záložku</h2>
                <URL onSubmit= {this.props.showPreviews}
                     onHide= {this.props.onHide}
                     previewsLoaded = {this.props.previewsLoaded}/>
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
                            moveToFolder = {function(){}}
                            previewsLoaded = {function(){}}
                            addItem = {this.props.addItem}/>          
            </div>
    )
  }
}