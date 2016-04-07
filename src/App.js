import React, { Component } from 'react'
import CardList from './List/CardList'
import SearchBar from './Search/SearchBar'
import ContextMenu from './List/contextmenu'
import TransparentOverlay from './transparentOverlay'
import EditForm from './Overlay/EditForm'
import Overlay from './Overlay/Overlay'
import * as ninja from './Libraries/arrayNinja'

export default class App extends Component {
    constructor(props) {
        super(props)
        try {
            var data = JSON.parse(localStorage["data"])
        } catch(err) {
            data = []
        }
        this.state = {  initialData: data,
                        data: [],
                        filterList: true,
                        cardDragStart: '',
                        contextMenu: false,
                        contextTop: '',
                        contextLeft: '',
                        contextID: '',
                        contextURL: 'test.test',
                        showEdit: false }  
    }     
    componentDidMount(){
        this.setState({data: this.state.initialData})
    }
    
    
    pageClick(){
        this.setState({contextMenu: false})
    }
    
    cardRightClick(evt, id, url){
        this.setState({contextMenu: true, 
                       contextTop: evt.clientY + window.scrollY ,
                       contextLeft: evt.clientX,
                       contextID: id,
                       contextURL: url })
    }
    
    hideOverlay(){
        this.setState({showEdit: false})
    }
    
    showAdd(updatedList){
        if (updatedList.length == this.state.initialData.length){
            this.state.filterList = true
        } else {
            this.state.filterList = false
        }
    }
      
    addItem(url){   
        var newData = ninja.addItemToArray(this.state.data, url)
        this.setState({ initialData : newData, 
                        data: newData })
        localStorage["data"] = JSON.stringify(newData)
    } 
    editItem(url) { 
        var newData = ninja.editItemInArray(this.state.data, this.state.contextID, url)
        this.setState({ initialData : newData, 
                        data: newData })
        localStorage["data"] = JSON.stringify(newData)
    }
    removeItem(id) {
        var newData = ninja.removeItemFromArray(this.state.data, id)
        this.setState({data: newData})
        localStorage["data"] = JSON.stringify(newData)  
    }  
    cardDragOver(id){
        var newData = ninja.moveItemInArray(this.state.data, this.state.cardDragStart, id)
        this.setState({cardDragStart: id})
        this.setState({initialData: newData , data: newData})
    }
    cardDragStart(id){
        this.setState({cardDragStart: id})
    }
    dropCard(){
        localStorage["data"] = JSON.stringify(this.state.data)
    }
    
    handleContextDelete(){
        this.removeItem(this.state.contextID) 
        this.setState({contextMenu: false})
    }
    handleContextEdit(){
        this.setState({showEdit: true})
        this.setState({contextMenu: false})
    }
    handleContextOpen(){
        window.open(this.state.contextURL)
        this.setState({contextMenu: false})
    }
        
    filterList(evt){
        var updatedList
        updatedList = this.state.initialData.filter(function(item){
            return item.name.toLowerCase().search(
            evt.value.toLowerCase()) !== -1
        })
        this.setState({data: updatedList})
        this.showAdd(updatedList)
    }
    
    render() {
        var contextMenu
        var contextStyle = {top: this.state.contextTop, 
                            left: this.state.contextLeft}
        if (this.state.contextMenu){
            contextMenu = (  
                <div>
                    <ContextMenu    style = {contextStyle}
                                    onDelete = {this.handleContextDelete.bind(this)}
                                    onEdit = {this.handleContextEdit.bind(this)}
                                    onOpen = {this.handleContextOpen.bind(this)}/>
                    <TransparentOverlay onClick={this.pageClick.bind(this)}/>
                </div>
            )
        }
        
        var editOverlay
        var id = this.state.contextID - 1
        if (this.state.showEdit){
            editOverlay = (  
                <div>
                    <EditForm    onSubmit={this.editItem.bind(this)} 
                                 onHide={this.hideOverlay.bind(this)}
                                 url={this.state.contextURL}/>
                    <Overlay    onClick={this.hideOverlay.bind(this)}/>
                </div>
                )
        }
        
        return ( 
            <div>
                <SearchBar  onFilter = {this.filterList.bind(this)}/>
                <CardList   data = {this.state.data} 
                            onDelete = {this.removeItem.bind(this)} 
                            showAdd = {this.state.filterList}
                            onAdd = {this.addItem.bind(this)}
                            cardDragOver = {this.cardDragOver.bind(this)}
                            cardDragStart = {this.cardDragStart.bind(this)}
                            cardRightClick = {this.cardRightClick.bind(this)}
                            dropCard = {this.dropCard.bind(this)}
                            />
                {contextMenu}
                {editOverlay}
            </div>
        )
    }
}
