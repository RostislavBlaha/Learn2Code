import React, { Component } from 'react';

export default class Overlay extends Component {
  render() {
    return (   
        <div className="overlay" onClick={this.props.onClick}>
        </div>

    );
  }
}
