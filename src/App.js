import React, { Component } from 'react';
import CardList from './List/CardList';
import SearchBar from './Search/SearchBar';


export default class App extends Component {
    removeItem(id) {       
        var newData = this.state.data.filter(function(obj){return (obj.id != id)});
        for (var i = 0; i < newData.length; i++) {
            if (newData[i].id > id){
                newData[i].id--;
            }
        }        
        this.setState({data: newData});
        localStorage["data"] = JSON.stringify(newData);     
    }
      
    onDrag(evt){
        evt.preventDefault();  
        evt.stopPropagation();
    }

    addItem(url){   
        var newData = this.state.data;
        var name = url.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
        var fixedURL;
        var prefix = 'http://';
        if (!/^https?:\/\//i.test(url.url)){
            fixedURL = prefix + url.url;
        }else{
            fixedURL = url.url;        
        }
        newData.push({id: this.state.data.length + 1, url: fixedURL, name: name, description:"Tady bude meta description"})
        this.setState({initialData : newData, data: newData});
        localStorage["data"] = JSON.stringify(newData);
    }
    
    cardDragOver(id){
        var newData = this.state.data;
        var startCard = "";
        
        for (var i = 0; i < newData.length; i++) {
            if (newData[i].id == this.state.cardDragStart){
                startCard = newData[i];
            }
        }
       
        if (startCard.id < id){
                for (var i = 0; i < newData.length; i++) {
                    if (newData[i].id > startCard.id && newData[i].id <= id){
                        newData[i].id = newData[i].id - 1;
                    }
                }  
        } else if (startCard.id > id){   
                for (var i = 0; i < newData.length; i++) {
                    if (newData[i].id < startCard.id && newData[i].id >= id){
                        newData[i].id++; 
                    }
                }  
            } 
        startCard.id = id;
        newData.sort((a, b) => a.id - b.id);
        this.setState({cardDragStart: id});
        this.setState({initialData: newData , data: newData});
    }
    
    cardDragStart(id){
        this.setState({cardDragStart: id});
    }
    
    dropCard(){
        localStorage["data"] = JSON.stringify(this.state.data);
    }
    
    showAdd(updatedList){
        if (updatedList.length == this.state.initialData.length){
            this.state.filterList = true;
        } else {
            this.state.filterList = false;
        }
    }
    
    componentDidMount(){
      this.setState({data: this.state.initialData});
      
    }

    filterList(evt){
        var updatedList;
        updatedList = this.state.initialData.filter(function(item){
            return item.name.toLowerCase().search(
            evt.value.toLowerCase()) !== -1;
            });
        this.setState({data: updatedList});
        this.showAdd(updatedList);
    }
    
  constructor(props) {
    super(props);
      
    try {
        var data = JSON.parse(localStorage["data"]);
    } catch(err) {
        data = [];
    }
    this.state = {  initialData: data,
                    data: [],
                    filterList: true,
                    cardDragStart: ''
    };
     
    
  }
  render() {
    return (
        
        <div>
            <SearchBar  onFilter={this.filterList.bind(this)}/>
            <CardList   data = {this.state.data} 
                        onDelete = {this.removeItem.bind(this)} 
                        showAdd = {this.state.filterList}
                        onAdd = {this.addItem.bind(this)}
                        cardDragOver = {this.cardDragOver.bind(this)}
                        cardDragStart = {this.cardDragStart.bind(this)}
                        dropCard = {this.dropCard.bind(this)}
                        />
        </div>
    );
  }
}
