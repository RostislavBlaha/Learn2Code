import React, { Component } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
    }
    
    mouseOver(){
        this.setState({hover: true});
    }
    
    mouseOut(){
        this.setState({hover: false});
    }
    
    handleClick(evt){
        evt.preventDefault();
        this.props.onDelete(this.props.card.id);
    }
    
    render() {
        
        var cross;
        if (this.state.hover){
            cross = (
                <div    className="crossWraper" 
                        onClick={this.handleClick.bind(this)}>
                    <img    src="./src/cross.svg" 
                            className="cross"/>
                </div>
            );
            
        }
        
        return (
          <a href = {this.props.card.url}>
              <div  className="card" 
                    onMouseOver={this.mouseOver.bind(this)} 
                    onMouseLeave={this.mouseOut.bind(this)}>
                  <div className="img">
                    {cross}
                  </div>
                  <div className="name">  
                    {this.props.card.name}     
                  </div>
              </div>
          </a>
        );
    
    }
}
