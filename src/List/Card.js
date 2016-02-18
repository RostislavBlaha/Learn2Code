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
    
    render() {
        
        var cross;
        if (this.state.hover){
            cross = (
                <div className="crossWraper" >
                    <img src="./src/cross.svg" className="cross" onClick={this.props.onDelete.bind(null, this.props.card.id)}/>
                </div>
            );
        }
        
        return (
          <a href = {this.props.card.url}>
              <div  className="card" 
                    onMouseOver={this.mouseOver.bind(this)} 
                    onMouseOut={this.mouseOut.bind(this)}
              >
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
