import React, { Component } from 'react';
import CardList from './List/CardList';
import SearchBar from './Search/SearchBar';


export default class App extends Component {
    removeItem(id) {    
      this.setState({data : this.state.data.filter(function(obj){return (obj.id != id)})}); 
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
        newData.push({id: Date.now(), url: fixedURL, name: name, description:"Tady bude meta description"})
        this.setState({data : newData});
        console.log(url.url);
    }
    
    filterList(evt){
        var updatedList;
        updatedList = this.state.data.filter(function(item){
            return item.name.toLowerCase().search(
            evt.value.toLowerCase()) !== -1;
            });
        this.setState({data: updatedList});  
    }
    
  constructor(props) {
      super(props);
    this.state = {data: [ 
          {id: 1, url: "https://www.seznam.cz", name: "Seznam.cz", description:"Tady bude meta description"},
          {id: 2, url: "https://www.google.cz", name: "Google", description:"Tady bude meta description"},
          {id: 3, url: "http://www.youtube.com", name: "YouTube", description:"Tady bude meta description"},
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
    };
    
  }
  render() {
    return (
        <div>
            <SearchBar onChange={this.filterList.bind(this)}/>
            <CardList data={this.state.data} onDelete={this.removeItem.bind(this)} onAdd={this.addItem.bind(this)}/>
        </div>
    );
  }
}
