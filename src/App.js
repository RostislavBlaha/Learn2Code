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
                        context: '',
                        showEdit: false,
                        showTrash: false,
                        showFolder: false,
                        activeFolder: [],
                        topFolder: ''}  
        document.addEventListener("keydown", this.handleKeyPress.bind(this), false)
    }    
    loadCommentsFromServer() {
      var xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
         console.log(xhttp.response)
        }
      }
      xhttp.open("GET", this.props.url, true);
      xhttp.send();
    }
      
    componentDidMount(){
        this.setState({data: this.state.initialData})
        this.loadCommentsFromServer()      
    }
    expandURL(url){
        var item = {    name:  url.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0], 
                        url: ((!/^https?:\/\//i.test(url.url)) ? 'http://' + url.url : url.url),
                        description:"Tady bude meta description"} 
        return item             
    }
    
    handleKeyPress(evt){
        var newData = [{"name":"seznam.cz","url":"http://seznam.cz", "img":"https://www.seznam.cz/media/img/seznam-icons/favicon-96x96.png", "description":"Tady bude meta description","id":0},{"name":"twitter.com","url":"http://twitter.com","img":"https://abs.twimg.com/a/1461952323/img/t1/favicon.svg", "description":"Tady bude meta description","id":1},{"name":"github.com","url":"http://github.com","img":"https://assets-cdn.github.com/favicon.ico", "description":"Tady bude meta description","id":2},{"type":"link","name":"lupa.cz","url":"http://www.lupa.cz/","img":"http://i.iinfo.cz/l/logo-lupa.png","description":"Tady bude meta description","id":3},{"type":"link","name":"boingboing.net","url":"http://boingboing.net/","img":"http://media.boingboing.net/wp-content/themes/bng/i/logo.png","description":"Tady bude meta description","id":4},{"type":"link","name":"czechcrunch.cz","url":"http://www.czechcrunch.cz/","img":"http://www.czechcrunch.cz/wp-content/uploads/2014/04/czechcrunch.png","description":"Tady bude meta description","id":5},{"type":"link","name":"techcrunch.com","url":"http://techcrunch.com/","img":"https://s0.wp.com/wp-content/themes/vip/techcrunch-2013/assets/images/logo.svg","description":"Tady bude meta description","id":6},{"type":"folder","name":"Blogy","data":[{"type":"link","name":"uxmovement.com","url":"http://uxmovement.com/","img":"http://uxmovement.com/wp-content/uploads/2015/12/uxmovement-logo.png","description":"Tady bude meta description","id":0},{"type":"link","name":"dokosiku.blogspot.cz","url":"http://dokosiku.blogspot.cz/","img":"http://1.bp.blogspot.com/_FERXCc5Modc/S5WB75a-DUI/AAAAAAAABs8/fLfACyZtxlM/S220-s73/marek_73x73.jpg","description":"Tady bude meta description","id":1},{"type":"link","name":"jxnblk.com","url":"http://jxnblk.com/writing/","img":"","description":"Tady bude meta description","id":2},{"type":"link","name":"schickelgruber.blog.cz","url":"http://schickelgruber.blog.cz/","img":"http://bs.jxs.cz/ublog/themes/36536894.jpg","description":"Tady bude meta description","id":3}],"id":7},{"type":"folder","name":"Novartis","data":[{"type":"link","name":"mos07.novartis.net:8443","url":"https://mos07.novartis.net:8443/jira/secure/Dashboard.jspa","img":"https://mos07.novartis.net:8443/jira/s/en_US-x65b74/70107/b6b48b2829824b869586ac216d119363/_/images/icon-jira-logo.png","description":"Tady bude meta description","id":0},{"type":"link","name":"mos05.novartis.net:8441","url":"https://mos05.novartis.net:8441/dashboard.action","img":"https://mos05.novartis.net:8441/s/en_GB/5994/3a465f7321af83b92e8f7149d515f72cee083e87.1/_/images/logo/confluence-logo.png","description":"Tady bude meta description","id":1}],"id":8},{"type":"link","name":"myhcl.com","url":"http://myhcl.com/","img":"https://www.myhcl.com/Login/images/welcome.png","description":"Tady bude meta description","id":9},{"type":"folder","name":"Další zajímavé odkazy","data":[{"type":"link","name":"lupa.cz","url":"http://www.lupa.cz/","img":"http://i.iinfo.cz/l/logo-lupa.png","description":"Tady bude meta description","id":0},{"type":"link","name":"boingboing.net","url":"http://boingboing.net/","img":"http://media.boingboing.net/wp-content/themes/bng/i/logo.png","description":"Tady bude meta description","id":1},{"type":"link","name":"czechcrunch.cz","url":"http://www.czechcrunch.cz/","img":"http://www.czechcrunch.cz/wp-content/uploads/2014/04/czechcrunch.png","description":"Tady bude meta description","id":2},{"type":"link","name":"techcrunch.com","url":"http://techcrunch.com/","img":"https://s0.wp.com/wp-content/themes/vip/techcrunch-2013/assets/images/logo.svg","description":"Tady bude meta description","id":3}],"id":10}]
        if (evt.keyCode == 33) {      
            this.setState({ initialData : newData, 
                            data: newData })
            localStorage["data"] = JSON.stringify(newData)     
        }
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
                        showFolder: false})
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
    addFolder(){   
        var item = {type: "folder",
                    name:"Moje složka",
                    data: []}     
        var newData = ninja.add(this.state.data, item)
        this.setState({ initialData : newData, 
                        data: newData })
        localStorage["data"] = JSON.stringify(newData)  
    }  
    addTrashFolder(){   
        var item = {type: "folder",
                    name:"Moje složka",
                    data: []}     
        var newTrash = ninja.add(this.state.trash, item)
        this.setState({ trash : newTrash})
        localStorage["trash"] = JSON.stringify(newTrash)  
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
        localStorage["data"] = JSON.stringify(newData)
    }
    changeName(name){
        var item = this.state.activeFolder
        item.name = name
        var newData = ninja.edit(this.state.data, item)
        this.setState({ initialData : newData, 
                        data: newData })
        localStorage["data"] = JSON.stringify(newData)
    }
    moveToTrash(id) {
        console.log("Smaž" + id)
        if (this.state.showFolder){
            var newTrash = ninja.moveToArray(this.state.data[this.state.activeFolder.id].data, this.state.trash, id)
            var newData = this.state.data
            newData[this.state.activeFolder.id].data = newTrash.source
            this.setState({ data: newData,
                            trash: newTrash.target})
            localStorage["data"] = JSON.stringify(newData)
            localStorage["trash"] = JSON.stringify(newTrash.target)     
        }else{
             var newData = ninja.moveToArray(this.state.data, this.state.trash, id)    
             this.setState({ data: newData.source,
                        trash: newData.target})
            localStorage["data"] = JSON.stringify(newData.source)
            localStorage["trash"] = JSON.stringify(newData.target)  
        }  
    }  
    moveFromTrash(id) {
        if (this.state.showFolder){
            var newData = ninja.moveToArray(this.state.trash[this.state.activeFolder.id].data, this.state.data, id)
            var newTrash = this.state.trash
            newTrash[this.state.activeFolder.id].data = newData.source
            this.setState({ trash: newTrash,
                            data: newData.target})
            localStorage["trash"] = JSON.stringify(newTrash)
            localStorage["data"] = JSON.stringify(newData.target) 
        }else{
            var newData = ninja.moveToArray(this.state.trash, this.state.data, id)
            this.setState({ trash: newData.source,
                            data: newData.target})
            localStorage["trash"] = JSON.stringify(newData.source)
            localStorage["data"] = JSON.stringify(newData.target)     
        }
    }  
    removeItem(id) {
        var newData = ninja.remove(this.state.trash, id)
        this.setState({ trash: newData})
        localStorage["trash"] = JSON.stringify(newData)  
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
        localStorage["data"] = JSON.stringify(this.state.data)
        localStorage["trash"] = JSON.stringify(this.state.trash)
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
        console.log(card)
            var id = card.id 
            if (this.state.topFolder == "trash"){
                if (card.type == "folder"){
                    var newTrash = ninja.moveToArray(this.state.trash, this.state.trash[id].data, this.state.cardDragStart)
                    this.setState({trash: newTrash.source})  
                    localStorage["trash"] = JSON.stringify(newTrash.source)
                }else{
                    this.addTrashFolder() 
                    var newWorld = ninja.moveToArray(this.state.trash, this.state.trash[this.state.trash.length-1].data, this.state.cardDragStart)
                    var newTrash = ninja.moveToArray(newWorld.source, newWorld.source[newWorld.source.length-1].data, id)
                    newTrash.source = ninja.move(newTrash.source, newTrash.source.length-1, id)
                    this.setState({trash: newTrash.source})  
                    localStorage["trash"] = JSON.stringify(newTrash.source)
                }
            }else{
                if (card.type == "folder"){
                    var newData = ninja.moveToArray(this.state.data, this.state.data[id].data, this.state.cardDragStart)
                    this.setState({data: newData.source})  
                    localStorage["data"] = JSON.stringify(newData.source)
                }else{
                    this.addFolder()
                    var newWorld = ninja.moveToArray(this.state.data, this.state.data[this.state.data.length-1].data, this.state.cardDragStart)
                    var newData = ninja.moveToArray(newWorld.source, newWorld.source[newWorld.source.length-1].data, id)
                    newData.source = ninja.move(newData.source, newData.source.length-1, id)
                    this.setState({data: newData.source})  
                    localStorage["data"] = JSON.stringify(newData.source)
                }
            }
    }
    
    moveFromFolder(){
        if (this.state.topFolder == "trash"){
        }else{
            var newWorld = ninja.moveToArray(this.state.data[this.state.activeFolder.id].data, this.state.data, this.state.cardDragStart)
            var newData = newWorld.target
            newData[this.state.activeFolder.id].data = newWorld.source
            this.setState({data: newData})  
            localStorage["data"] = JSON.stringify(newData)
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
                    <EditForm    onSubmit={this.editItem.bind(this)} 
                                 onHide={this.hideOverlay.bind(this)}
                                 url={this.state.context.url}/>
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
                            cardRightClick = {function(){}}
                            canDelete = {true}
                            openFolder = {this.openFolder.bind(this, "trash")}
                            moveToFolder ={this.moveToFolder.bind(this)}
                            changeName ={function(){}}
                            moveFromFolder = {this.moveFromFolder.bind(this)}
                            closeOverlay = {this.hideOverlay.bind(this)}/>
                    <Overlay  onClick={this.hideOverlay.bind(this)}/>
                </div>
                )
        }
        
        var folderOverlay
        if (this.state.showFolder){
            folderOverlay = (  
                <div>
                    <Folder name = {this.state.activeFolder.name}
                            showAdd = {(this.state.topFolder == "trash" ? false : true)}
                            onAdd = {this.addItem.bind(this)}
                            onHide={this.hideOverlay.bind(this)}
                            onKeyDown={this.handleKeyPress.bind(this)}
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
                            closeOverlay = {this.hideOverlay.bind(this)}/>
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
                            dropCard = {this.dropCard.bind(this)}
                            openFolder = {this.openFolder.bind(this, "topFolder")}
                            canDelete = {false}
                            moveToFolder ={this.moveToFolder.bind(this)}/>
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
