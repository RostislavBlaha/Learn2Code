import React, { Component } from 'react'

export default class TransparentOverlay extends Component {
  render() {
    return (   
        <div className="transparentOverlay" onClick={this.props.onClick}>
        </div>

    );
  }
}
