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
        console.log(newData);
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
    }
    
    cardDragOver(test){
        console.log(test + " " + this);
    }
    
    showAdd(updatedList){
        if (updatedList.length == this.state.initialData.length){
            this.state.filterList = true;
        } else {
            this.state.filterList = false;
        }
    }
    
    componentDidMount(){
      this.setState({data: this.state.initialData.sort((a, b) => a.id - b.id)});
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
    this.state = {initialData: [ 
          {id: 1, url: "https://www.seznam.cz", name: "Seznam.cz", description:"Tady bude meta description"},
          {id: 3, url: "https://www.google.cz", name: "Google", description:"Tady bude meta description"},
          {id: 2, url: "http://www.youtube.com", name: "YouTube", description:"Tady bude meta description"},
          {id: 4, url: "http://www.bookdepository.com", name: "Book Depository", description:"Tady bude meta description"},
          {id: 5, url: "http://www.boingboing.com", name: "Boing Boing", description:"Tady bude meta description"},
          {id: 6, url: "http://www.techcrunch.com", name: "TechCrunch", description:"Tady bude meta description"},
          {id: 7, url: "http://www.czechcrunch.cz", name: "Czech Crunch", description:"Tady bude meta description"},
          {id: 8, url: "http://www.lupa.cz", name: "Lupa.cz", description:"Tady bude meta description"},
          {id: 9, url: "http://www.linkedin.com", name: "Linkedin", description:"Tady bude meta description"},
          {id: 10, url: "http://www.twitter.com", name: "Twitter", description:"Tady bude meta description"},
          {id: 11, url: "http://www.bookdepository.com", name: "Book Depository", description:"Tady bude meta description"},
          {id: 12, url: "https://www.zonky.cz", name: "Zonky", description:"Tady bude meta description"},
          {id: 13, url: "http://www.twitter.com", name: "Twitter", description:"Tady bude meta description"},
          {id: 14, url: "http://www.bookdepository.com", name: "Book Depository", description:"Tady bude meta description"},
          {id: 15, url: "https://www.zonky.cz", name: "Zonky", description:"Tady bude meta description"}],
          data: [],
          filterList: true
    };
    
  }
  render() {
    return (
        <div    className = "wrapper"
                onDragOver = {this.dragOver}>
            <SearchBar onFilter={this.filterList.bind(this)}/>
            <CardList data = {this.state.data} 
                      onDelete = {this.removeItem.bind(this)} 
                      showAdd = {this.state.filterList}
                      onAdd = {this.addItem.bind(this)}
                      cardDragOver = {this.cardDragOver.bind(this)}/>
        </div>
    );
  }
}
