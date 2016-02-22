import React, { Component } from 'react';

export default class SearchBar extends Component {
    handleChange(evt){
        var value = evt.target.value;
        this.props.onChange({value: value});
    }
    
    render() {    
        return (
            <div className="searchForm">
                <form>    
                    <input  type="text"
                            className="searchBar"
                            placeholder="Hledat v záložkách"
                            onChange={this.handleChange.bind(this)}/>
                    <button type="submit" 
                            value="Post" 
                            className="searchButton">
                    </button>
                </form>
                    
            </div>
    );
  }
}