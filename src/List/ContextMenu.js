import React, { Component } from 'react';


export default class Card extends Component {
    handleClick(evt){
        evt.preventDefault();
        evt.stopPropagation();
        this.props.onDelete(this.props.card.id);
    }
    render() {
        return (
            <div className="contextMenu" style={this.props.style}>
                <ul>
                    <li className="menuItem">Upravit</li>
                    <li className="menuItem"
                        onClick={this.handleClick.bind(this)}>
                        Přesunout do koše
                    </li>
                </ul>
            </div>
        );
    
    }
}
