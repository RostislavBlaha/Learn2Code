import React, { Component } from 'react'

export default class LeftMenu extends Component {
    handleTrash(evt){
        evt.preventDefault()
    }
    
    render() {    
        return (
            <div className="leftMenu">
                <ul>
                    <li className="leftMenuItem"
                        onClick={this.handleTrash.bind(this)}>
                        <img src="./src/trash.svg" className="trash" alt="Koš" title="Koš" />
                    </li>
                </ul>    
            </div>
        )
    }
}