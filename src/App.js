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
            var json = JSON.parse(localStorage["data"])
            var data = json.data
            var localDate = json.date
        } catch(err) {
            localDate = 0
            data = err
        }
        
        try {
            var trash = JSON.parse(localStorage["trash"])
        } catch(err) {
            trash = []
        }
        this.state = {  initialData: data,
                        localDate: localDate,
                        data: [],
                        trash: trash,
                        filterList: true,
                        cardDragStart: '',
                        contextMenu: false,
                        contextTop: '',
                        contextLeft: '',
                        context: '',
                        showEdit: false,
                        showTrash: false,
                        showFolder: false,
                        activeFolder: [],
                        topFolder: '',
                        website:[],
                        previewsLoaded: false}  
    }
          
    componentDidMount(){
        this.setState({data: this.state.initialData})
        this.loadData()  
    }
    
    loadData() {
        fetch(this.props.url, {
            method: 'get'
        }).then(function(res) {
            return res.json()
        }).then(function(json){
            if (json.date < this.state.localDate ){
                this.saveData(this.state.initialData, this.state.localDate) 
            } else if (json.date == this.state.localDate){        
            } else {
                 this.setState({localDate: json.date})
                 this.saveData(json.data, json.date)     
            }
        }).catch(function(err) {})
    }
    
    saveData(data, date){
        this.setState({ initialData : data, 
                        data: data})
        var newData = { date: date,
                        data: data}
        localStorage["data"] = JSON.stringify(newData)    
        fetch(this.props.url, {
          headers: new Headers({
              'Content-Type': 'application/json'
          }),    
          method: 'post',
          body: JSON.stringify(newData)
        })
   }
    
    saveTrash(data){
        this.setState({ trash : data})
        localStorage["trash"] = JSON.stringify(data)     
    }
    
    expandURL(url){
        var item = {    type: "link" ,   
                        name:  url.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0], 
                        url: ((!/^https?:\/\//i.test(url.url)) ? 'http://' + url.url : url.url),
                        description:"Tady bude meta description", img:""} 
        return item             
    }
    
    pageClick(){
        this.setState({contextMenu: false})
    }
    
    cardRightClick(evt, context){
        this.setState({contextMenu: true, 
                       contextTop: evt.clientY + window.scrollY ,
                       contextLeft: evt.clientX,
                       context: context })
    }
    
    hideOverlay(){
        this.setState({ showEdit: false,
                        showTrash: false,
                        showFolder: false,
                        website:[]})
    }
    
    showAdd(updatedList){
            this.state.filterList = (updatedList.length == this.state.initialData.length) ? true : false
    }
    
    showPreviews(url){  
        var item = this.expandURL(url) 
        var apiURL = "/api/images/" + "?url=" + item.url
        var that = this
        fetch(apiURL, {
                method: 'get'
            }).then(function(res) {
                return res.json()
            }).then(function(website){
                that.setState({website: website})
                that.setState({previewsLoaded: true})
            }).catch(function(err) {}) 
    } 
      
    addItem(card){  
        var item = card
        item.type = "link"
        var newData = ninja.add(this.state.data, item)
        this.saveData(newData, Date.now()) 
        this.hideOverlay()
    } 
    addFolder(){   
        var item = {type: "folder",
                    name:"Moje složka",
                    data: []
                   }     
        var newData = ninja.add(this.state.data, item)
        this.saveData(newData, Date.now())
    }  
    addTrashFolder(){   
        var item = {type: "folder",
                    name:"Moje složka",
                    data: []}     
        var newTrash = ninja.add(this.state.trash, item)
        this.saveTrash(newTrash)
    } 
    openFolder(topFolder, id){
        if (topFolder == "trash"){
            this.setState({ activeFolder: this.state.trash[id],
                            showFolder: true,
                            contextMenu: false,
                            showTrash: false})
        }else{
            this.setState({ activeFolder: this.state.data[id],
                            showFolder: true,
                            contextMenu: false})
        }
        window.scrollTo(0,0)
        this.state.topFolder = topFolder
    }
    editItem(url) { 
        var item = this.expandURL(url)   
        item.id = this.state.context.id
        var newData = ninja.edit(this.state.data, item)
        this.setState({ initialData : newData, 
                        data: newData })
        this.saveData(newData, Date.now()) 
    }
    changeName(name){
        var item = this.state.activeFolder
        item.name = name
        var newData = ninja.edit(this.state.data, item)
        this.saveData(newData, Date.now()) 
    }
    moveToTrash(id) {
        if (this.state.showFolder){
            var newTrash = ninja.moveToArray(this.state.data[this.state.activeFolder.id].data, this.state.trash, id)
            var newData = this.state.data
            newData[this.state.activeFolder.id].data = newTrash.source
            this.saveTrash(newTrash.target)   
            this.saveData(newData, Date.now()) 
        }else{
            var newData = ninja.moveToArray(this.state.data, this.state.trash, id) 
            this.saveTrash(newData.target) 
            this.saveData(newData.source, Date.now()) 
        }  
    }  
    moveFromTrash(id) {
        if (this.state.showFolder){
            var newData = ninja.moveToArray(this.state.trash[this.state.activeFolder.id].data, this.state.data, id)
            var newTrash = this.state.trash
            newTrash[this.state.activeFolder.id].data = newData.source
            this.saveTrash(newTrash) 
            this.saveData(newData.target, Date.now()) 
        }else{
            var newData = ninja.moveToArray(this.state.trash, this.state.data, id)
            this.saveTrash(newData.source) 
            this.saveData(newData.target, Date.now()) 
        }
    }  
    removeItem(id) {
        var newTrash = ninja.remove(this.state.trash, id)
        this.saveTrash(newTrash)  
    }  
    refuseImage(id) {
        var newWebsite = ninja.remove(this.state.website, id)
        this.setState({website: newWebsite})
    } 
    cardDragOver(id){
        var newData = ninja.move(this.state.data, this.state.cardDragStart, id)
        this.setState({cardDragStart: id,
                       initialData: newData, 
                       data: newData})
    }
    trashDragOver(id){
        var newTrash= ninja.move(this.state.trash, this.state.cardDragStart, id)
        this.setState({cardDragStart: id,
                       trash: newTrash})
    }
    folderDragOver(id){
        if (this.state.topFolder == "trash"){
            var newTrash = this.state.trash 
            newTrash[this.state.activeFolder.id].data = ninja.move(this.state.trash[this.state.activeFolder.id].data, this.state.cardDragStart, id)
            this.setState({ cardDragStart: id,
                            trash: newTrash})
        }else{
            var newData = this.state.data
            newData[this.state.activeFolder.id].data = ninja.move(this.state.data[this.state.activeFolder.id].data, this.state.cardDragStart, id)
            this.setState({ cardDragStart: id,
                            data: newData})
        }
    }
    
    cardDragStart(id){
        this.setState({cardDragStart: id})
    }
    dropCard(){
        this.saveTrash(this.state.trash) 
        this.saveData(this.state.initialData, Date.now()) 
    }
    
    handleContextDelete(){
        this.removeItem(this.state.data[this.state.context.id]) 
        this.setState({contextMenu: false})
    }
    handleContextEdit(){
        this.setState({showEdit: true,
                       contextMenu: false})
    }
    handleContextOpen(){
        if (this.state.context.type == "folder"){
            for (let i = 0; i < this.state.context.data.length; i++) {
                window.open(this.state.context.data[i].url)
            }
        }else{
            window.open(this.state.context.url)    
        }
        this.setState({contextMenu: false})
    }
    handleTrash(){
        this.setState({ showTrash: true,
                        contextMenu: false,
                        topFolder: "trash"
                      })
    }
    moveToFolder(card){
            var id = card.id 
            if (this.state.topFolder == "trash"){
                if (card.type == "folder"){
                    var newTrash = ninja.moveToArray(this.state.trash, this.state.trash[id].data, this.state.cardDragStart)
                    this.saveTrash(newTrash.source)  
                }else{
                    this.addTrashFolder() 
                    var newWorld = ninja.moveToArray(this.state.trash, this.state.trash[this.state.trash.length-1].data, this.state.cardDragStart)
                    var newTrash = ninja.moveToArray(newWorld.source, newWorld.source[newWorld.source.length-1].data, id)
                    newTrash.source = ninja.move(newTrash.source, newTrash.source.length-1, id)
                    this.saveTrash(newTrash.source) 
                }
            }else{
                if (card.type == "folder"){
                    var newData = ninja.moveToArray(this.state.data, this.state.data[id].data, this.state.cardDragStart) 
                    this.saveData(newData.source, Date.now()) 
                }else{
                    this.addFolder()
                    var newWorld = ninja.moveToArray(this.state.data, this.state.data[this.state.data.length-1].data, this.state.cardDragStart)
                    var newData = ninja.moveToArray(newWorld.source, newWorld.source[newWorld.source.length-1].data, id)
                    newData.source = ninja.move(newData.source, newData.source.length-1, id)
                    this.saveData(newData.source, Date.now()) 
                }
            }
    }
    
    moveFromFolder(){
        if (this.state.topFolder == "trash"){
        }else{
            var newWorld = ninja.moveToArray(this.state.data[this.state.activeFolder.id].data, this.state.data, this.state.cardDragStart)
            var newData = newWorld.target
            newData[this.state.activeFolder.id].data = newWorld.source 
            this.saveData(newData, Date.now()) 
        }    
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
        var id = this.state.context.id - 1
        if (this.state.showEdit){
            editOverlay = (  
                <div>
                    <EditForm   onAdd={this.addItem.bind(this)} 
                                website={this.state.website}
                                onRefuse={this.props.onRefuse}
                                onHide={this.hideOverlay.bind(this)}
                                url={this.state.context.url}/>
                    <Overlay    onClick={this.hideOverlay.bind(this)}/>
                </div>
                )
        }
        
        var trashOverlay
        if (this.state.showTrash){
            trashOverlay = (  
                <div>
                    <Folder name = "Koš"
                            onHide={this.hideOverlay.bind(this)}
                            data = {this.state.trash} 
                            onDelete = {this.removeItem.bind(this)}
                            cardDragOver = {this.trashDragOver.bind(this)}
                            cardDragStart = {this.cardDragStart.bind(this)}
                            dropCard = {this.dropCard.bind(this)}
                            onUndelete = {this.moveFromTrash.bind(this)}
                            cardRightClick = {function(){}}
                            canDelete = {true}
                            openFolder = {this.openFolder.bind(this, "trash")}
                            moveToFolder ={this.moveToFolder.bind(this)}
                            changeName ={function(){}}
                            moveFromFolder = {this.moveFromFolder.bind(this)}
                            closeOverlay = {this.hideOverlay.bind(this)}
                            previewsLoaded = {function(){}}/>
                    <Overlay  onClick={this.hideOverlay.bind(this)}/>
                </div>
                )
        }
        
        var folderOverlay
        if (this.state.showFolder){
            folderOverlay = (  
                <div>
                    <Folder name = {this.state.activeFolder.name}
                            showPreviews = {this.showPreviews.bind(this)}
                            showAdd = {(this.state.topFolder == "trash" ? false : true)}
                            addItem = {this.addItem.bind(this)}
                            onHide={this.hideOverlay.bind(this)}
                            data = {this.state.activeFolder} 
                            onDelete = {this.moveToTrash.bind(this)} 
                            cardDragOver = {this.folderDragOver.bind(this)}
                            cardDragStart = {this.cardDragStart.bind(this)}
                            dropCard = {this.dropCard.bind(this)}
                            onUndelete = {this.moveFromTrash.bind(this)}
                            cardRightClick = {this.cardRightClick.bind(this)}
                            canDelete = {(this.state.topFolder == "trash" ? true : false)}
                            openFolder = {this.openFolder.bind(this, "folder")}
                            moveToFolder ={function(){}}
                            changeName ={this.changeName.bind(this)}
                            moveFromFolder = {this.moveFromFolder.bind(this)}
                            closeOverlay = {this.hideOverlay.bind(this)} 
                            website = {this.state.website}
                            onRefuse = {this.refuseImage.bind(this)}
                            previewsLoaded = {this.state.previewsLoaded}/>
                    <Overlay  onClick={this.hideOverlay.bind(this)}/>
                </div>
                )
        }
        
        return ( 
            <div>
                <SearchBar  onFilter = {this.filterList.bind(this)}/>
                <CardList   data = {this.state.data} 
                            showPreviews = {this.showPreviews.bind(this)}
                            onDelete = {this.moveToTrash.bind(this)} 
                            showAdd = {this.state.filterList}
                            addItem = {this.addItem.bind(this)}
                            cardDragOver = {this.cardDragOver.bind(this)}
                            cardDragStart = {this.cardDragStart.bind(this)}
                            cardRightClick = {this.cardRightClick.bind(this)}
                            dropCard = {this.dropCard.bind(this)}
                            openFolder = {this.openFolder.bind(this, "topFolder")}
                            canDelete = {false}
                            moveToFolder ={this.moveToFolder.bind(this)}
                            website = {this.state.website}
                            onRefuse = {this.refuseImage.bind(this)}
                            previewsLoaded = {this.state.previewsLoaded}/>
                <LeftMenu   showTrash = {this.handleTrash.bind(this)}
                            addFolder = {this.addFolder.bind(this)}
                            onDrop ={this.moveToTrash.bind(this, this.state.cardDragStart)}/>
                {contextMenu}
                {editOverlay}
                {trashOverlay}
                {folderOverlay}
            </div>
        )
    }
}
