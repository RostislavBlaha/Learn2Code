import React, { Component } from 'react'
import URL from './url'

export default class AddForm extends Component {   
  render() {  
    return (
            <div className="addForm">
                <h2>Přidat záložku</h2>
                <URL onSubmit= {this.props.onAdd}
                     onHide= {this.props.onHide}/>     
            </div>
    )
  }
}