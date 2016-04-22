import React, { Component } from 'react'

export default class LeftMenu extends Component {
    handleTrash(evt){
        evt.preventDefault()
        this.props.showTrash()
    }
    
    handleAddFolder(evt){
        evt.preventDefault()
        this.props.addFolder()
    }
    
    render() {    
        return (
            <div className="leftMenu">
                <ul>
                    <li className="leftMenuItem"
                        onClick={this.handleTrash.bind(this)}>
                        <img src="./src/trash.svg" className="trashIcon" alt="Koš" title="Koš" />
                    </li>
                    <li className="leftMenuItem"
                        onClick={this.handleAddFolder.bind(this)}>
                        <img src="./src/addfolder.svg" className="addfolderIcon" alt="Koš" title="Koš" />
                    </li>
                </ul>    
            </div>
        )
    }
}