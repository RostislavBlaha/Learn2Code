import React, { Component } from 'react';


export default class Card extends Component {
    render() {
        return (
            <div className="contextMenu">
                <ul>
                    <li className="menuItem">Upravit</li>
                    <li className="menuItem">Přesunout do koše</li>
                </ul>
            </div>
        );
    
    }
}
