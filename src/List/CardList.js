import React, { Component } from 'react'
import Card from './Card'
import Add from './Add'
import Overlay from '../Overlay/Overlay'
import AddForm from '../Overlay/AddForm'



export default class CardList extends Component {
  constructor(props) {
    super(props)
    this.state = {  showNew: false}
  }
    
    componentWillReceiveProps(nextProps){
        if (nextProps.showNew){
            this.showNew()
        }
    
    }
    
  showNew (){
        this.setState({showNew: (this.state.showNew) ? false : true})
  }
   
  render() {
    var removeCard = this.props.onDelete 
    var cardDragOver = this.props.cardDragOver
    var dropCard = this.props.dropCard
    var cardDragStart = this.props.cardDragStart
    var cardRightClick = this.props.cardRightClick
    var canDelete = this.props.canDelete
    var openFolder = this.props.openFolder
    var onUndelete = this.props.onUndelete
    var moveToFolder = this.props.moveToFolder
    var addItem = this.props.addItem
    var listNodes = this.props.data.map(function(card){
        return (
        <Card   key = {card.id} 
                card={card} 
                onDelete={removeCard}
                onUndelete={onUndelete}
                canDelete ={canDelete}
                cardDragOver={cardDragOver}
                dropCard={dropCard}
                cardDragStart={cardDragStart}
                cardRightClick={cardRightClick}
                openFolder={openFolder}
                moveToFolder={moveToFolder}
                addItem={addItem}
            />
        )
    })
     
    var newOverlay
    if (this.state.showNew){
        newOverlay = (  
            <div>
                <AddForm    showPreviews={this.props.showPreviews}
                            addItem={this.props.addItem} 
                            onHide={this.showNew.bind(this)}
                            website={this.props.website}
                            onRefuse={this.props.onRefuse}
                            previewsLoaded = {this.props.previewsLoaded}/>
                <Overlay    onClick={this.showNew.bind(this)}/>
            </div>
            )
    }
    
    var add
    if (this.props.showAdd){
        add = (<Add onClick={this.showNew.bind(this)}/>)
    }

    return (
      <div>
          <div className="cardList">
            {listNodes}
            {add}
          </div>
            {newOverlay}
      </div>
    )
  }
}
