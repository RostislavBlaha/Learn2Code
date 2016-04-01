import React, { Component } from 'react'
import URL from './url'

export default class EditForm extends Component {   
  render() {
    var onHide = this.props.onHide
    var onSubmit = this.props.onSubmit
    var editURL = this.props.url
    return (
            <div className="addForm">
                <h2>Upravit záložku</h2>
                <URL onSubmit = {onSubmit}
                     onHide = {onHide}
                     url = {editURL}/>     
            </div>
    )
  }
}