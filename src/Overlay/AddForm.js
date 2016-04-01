import React, { Component } from 'react'
import URL from './url'

export default class AddForm extends Component {   
  render() {  
    var onAdd = this.props.onAdd
    var onHide = this.props.onHide
    return (
            <div className="addForm">
                <h2>Přidat záložku</h2>
                <URL onSubmit= {onAdd}
                     onHide= {onHide}/>     
            </div>
    )
  }
}