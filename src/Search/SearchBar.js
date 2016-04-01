import React, { Component } from 'react'

export default class SearchBar extends Component {
    handleChange(evt){
        var value = evt.target.value
        this.props.onFilter({value: value})
    }
    
    handleSubmit(evt) {
      evt.preventDefault()  
      var value = evt.target.value
      window.open("http://www.google.com/search?q=" + value, "_self")    
    }
    
    handleKeyPress(evt){ 
      if (evt.keyCode == 13) {      
          this.handleSubmit(evt)    
      }
    }
    
    render() {    
        return (
            <div className="searchForm">
                <form   onKeyDown={this.handleKeyPress.bind(this)}
                        onSubmit={this.handleSubmit.bind(this)}>    
                    <input  ref="searchBar"
                            type="text"
                            className="searchBar"
                            placeholder="Hledat v záložkách"
                            onChange={this.handleChange.bind(this)}/>
                    <button type="submit" 
                            value="Post" 
                            className="searchButton">
                        <img src = "./src/g.svg" className ="g"/>
                    </button>
                </form>
                    
            </div>
    )
  }
}