import React, { Component } from 'react'

export default class LeftMenu extends Component {
    handleTrash(evt){
        evt.preventDefault()
        this.props.showTrash()
    }
    
    onDrop(evt){
        evt.stopPropagation()
        evt.preventDefault()
        this.props.onDrop()
        console.log("test")
    }
    
    onDragOver(evt){
        evt.preventDefault() 
        evt.stopPropagation()
    }

    render() {    
        return (
            <div className="leftMenu">
                <ul>
                    <li className="leftMenuItem"
                        onClick={this.handleTrash.bind(this)}
                        onDrop={this.onDrop.bind(this)}
                        onDragOver={this.onDragOver.bind(this)}>
                        <img src="./src/trash.svg" className="trashIcon" alt="Koš" title="Koš" />
                    </li>
                </ul>    
            </div>
        )
    }
}