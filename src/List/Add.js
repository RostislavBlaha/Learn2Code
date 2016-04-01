import React, { Component } from 'react';

export default class Add extends Component {
  render() {
    return (
        <div className="card" onClick={this.props.onClick}>
            <div className="plus">
            </div>
            <div className="pridat">  
                Přidat záložku   
            </div>
        </div>
    )
  }
}