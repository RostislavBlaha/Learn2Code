import React, { Component } from 'react'
import CardList from './List/CardList'
import SearchBar from './Search/SearchBar'
import ContextMenu from './List/contextmenu'
import TransparentOverlay from './transparentOverlay'
import EditForm from './Overlay/EditForm'
import Overlay from './Overlay/Overlay'
import Folder from './Overlay/Folder'
import LeftMenu from './Menu/LeftMenu'
import * as ninja from './Libraries/arrayNinja'

export default class App extends Component {
    constructor(props) {
        super(props)
        try {
            var data = JSON.parse(localStorage["data"])
        } catch(err) {
            data = []
        }
        try {
            var trash = JSON.parse(localStorage["trash"])
        } catch(err) {
            trash = []
        }
        this.state = {  initialData: data,
                        data: [],
                        trash: trash,
                        filterList: true,
                        cardDragStart: '',
                        contextMenu: false,
                        contextTop: '',
                        contextLeft: '',
                        contextID: '',
                        contextURL: '',
                        showEdit: false,
                        showTrash: false}  
        document.addEventListener("keydown", this.handleKeyPress.bind(this), false)
    }     
    componentDidMount(){
        this.setState({data: this.state.initialData})
        
    }
    expandURL(url){
        var item = {    name:  url.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0], 
                        url: ((!/^https?:\/\//i.test(url.url)) ? 'http://' + url.url : url.url),
                        description:"Tady bude meta description"} 
        return item             
    }
    
    handleKeyPress(evt){
        var newData = [ {name:"lupa.cz",
                         url:"http://www.lupa.cz/",
                         description:"Tady bude meta description",
                         id:0},           
                        {name:"boingboing.net",
                         url:"http://boingboing.net/",
                         description:"Tady bude meta description",
                         id:1},
                        {name:"czechcrunch.cz",
                         url:"http://www.czechcrunch.cz/",
                         description:"Tady bude meta description",
                         id:2},
                        {name:"techcrunch.com",
                         url:"http://techcrunch.com/",
                         description:"Tady bude meta description",
                         id:3},
                        {name:"schickelgruber.blog.cz",
                         url:"http://schickelgruber.blog.cz/",
                         description:"Tady bude meta description",
                         id:4},
                        {name:"uxmovement.com",
                         url:"http://uxmovement.com/",
                         description:"Tady bude meta description",
                         id:5},
                        {name:"jxnblk.com",
                         url:"http://jxnblk.com/writing/",
                         description:"Tady bude meta description",
                         id:6},
                        {name:"dokosiku.blogspot.cz",
                         url:"http://dokosiku.blogspot.cz/",
                         description:"Tady bude meta description",
                         id:7},
                        {name:"mos05.novartis.net:8441",
                         url:"https://mos05.novartis.net:8441/dashboard.action",
                         description:"Tady bude meta description",
                         id:8},
                        {name:"mos07.novartis.net:8443",
                         url:"https://mos07.novartis.net:8443/jira/secure/Dashboard.jspa",
                         description:"Tady bude meta description",
                         id:9},
                        {name:"myhcl.com",
                         url:"http://myhcl.com/",
                         description:"Tady bude meta description",
                         id:10}
                      ]
        if (evt.keyCode == 33) {      
            this.setState({ initialData : newData, 
                            data: newData })
            localStorage["data"] = JSON.stringify(newData)     
        }
    }
    
    pageClick(){
        this.setState({contextMenu: false})
        console.log(this)
    }
    
    cardRightClick(evt, id, url){
        this.setState({contextMenu: true, 
                       contextTop: evt.clientY + window.scrollY ,
                       contextLeft: evt.clientX,
                       contextID: id,
                       contextURL: url })
    }
    
    hideOverlay(){
        this.setState({ showEdit: false,
                        showTrash: false})
    }
    
    showAdd(updatedList){
        if (updatedList.length == this.state.initialData.length){
            this.state.filterList = true
        } else {
            this.state.filterList = false
        }
    }
      
    addItem(url){   
        var item = this.expandURL(url)      
        var newData = ninja.add(this.state.data, item)
        this.setState({ initialData : newData, 
                        data: newData })
        localStorage["data"] = JSON.stringify(newData)  
    } 
    editItem(url) { 
        var item = this.expandURL(url)   
        item.id = this.state.contextID
        var newData = ninja.edit(this.state.data, item)
        this.setState({ initialData : newData, 
                        data: newData })
        localStorage["data"] = JSON.stringify(newData)
    }
    moveToTrash(id) {
        var newData = ninja.moveToArray(this.state.data, this.state.trash, id)
        this.setState({ data: newData.source,
                        trash: newData.target})
        localStorage["data"] = JSON.stringify(newData.source)
        localStorage["trash"] = JSON.stringify(newData.target)  
    }  
    moveFromTrash(id) {
        var newData = ninja.moveToArray(this.state.trash, this.state.data, id)
        this.setState({ trash: newData.source,
                        data: newData.target})
        localStorage["trash"] = JSON.stringify(newData.source)
        localStorage["data"] = JSON.stringify(newData.target)  
    }  
    removeItem(id) {
        var newData = ninja.remove(this.state.trash, id)
        this.setState({ trash: newData})
        localStorage["trash"] = JSON.stringify(newData)  
    }  
    cardDragOver(id, folder){
        var newData = ninja.move(this.state.data, this.state.cardDragStart, id)
        this.setState({cardDragStart: id,
                       initialData: newData, 
                       data: newData})
    }
    trashDragOver(id, folder){
        var newTrash= ninja.move(this.state.trash, this.state.cardDragStart, id)
        this.setState({cardDragStart: id,
                       trash: newTrash})
    }
    
    cardDragStart(id){
        this.setState({cardDragStart: id})
    }
    dropCard(){
        localStorage["data"] = JSON.stringify(this.state.data)
        localStorage["trash"] = JSON.stringify(this.state.trash)
    }
    
    handleContextDelete(){
        this.removeItem(this.state.data[this.state.contextID]) 
        this.setState({contextMenu: false})
    }
    handleContextEdit(){
        this.setState({showEdit: true,
                       contextMenu: false})
    }
    handleContextOpen(){
        window.open(this.state.contextURL)
        this.setState({contextMenu: false})
    }
    handleTrash(){
        this.setState({ showTrash: true,
                        contextMenu: false})
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
                    <Overlay     onClick={this.hideOverlay.bind(this)}/>
                </div>
                )
        }
        
        var trashOverlay
        if (this.state.showTrash){
            trashOverlay = (  
                <div>
                    <Folder name = "Koš"
                            onHide={this.hideOverlay.bind(this)}
                            onKeyDown={this.handleKeyPress.bind(this)}
                            data = {this.state.trash} 
                            onDelete = {this.removeItem.bind(this)}
                            cardDragOver = {this.trashDragOver.bind(this)}
                            cardDragStart = {this.cardDragStart.bind(this)}
                            dropCard = {this.dropCard.bind(this)}
                            onUndelete = {this.moveFromTrash.bind(this)}
                            cardRightClick = {function(){}}/>
                    <Overlay  onClick={this.hideOverlay.bind(this)}/>
                </div>
                )
        }
        
        return ( 
            <div>
                <SearchBar  onFilter = {this.filterList.bind(this)}/>
                <CardList   onKeyDown={this.handleKeyPress.bind(this)}
                            data = {this.state.data} 
                            onDelete = {this.moveToTrash.bind(this)} 
                            showAdd = {this.state.filterList}
                            onAdd = {this.addItem.bind(this)}
                            cardDragOver = {this.cardDragOver.bind(this)}
                            cardDragStart = {this.cardDragStart.bind(this)}
                            cardRightClick = {this.cardRightClick.bind(this)}
                            dropCard = {this.dropCard.bind(this)}/>
                <LeftMenu showTrash = {this.handleTrash.bind(this)}/>
                {contextMenu}
                {editOverlay}
                {trashOverlay}
            </div>
        )
    }
}
