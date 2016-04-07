import React, { Component } from 'react'


export default class ContextMenu extends Component {
    handleDelete(evt){
        evt.preventDefault()
        this.props.onDelete()
    }
    handleEdit(evt){
        evt.preventDefault()
        this.props.onEdit()
    }
    handleOpen(evt){
        evt.preventDefault()
        this.props.onOpen()
    }
    render() {
        return (
            <div className="contextMenu" style={this.props.style}>
                <ul>
                    <li className="menuItem"
                        onClick={this.handleEdit.bind(this)}>
                        Upravit
                    </li>
                    <li className="menuItem"
                        onClick={this.handleDelete.bind(this)}>
                        Přesunout do koše
                    </li>
                    <li className="menuItem"
                        onClick={this.handleOpen.bind(this)}>
                        Otevřít na nové záložce
                    </li>
                </ul>
            </div>
        )
    
    }
}
