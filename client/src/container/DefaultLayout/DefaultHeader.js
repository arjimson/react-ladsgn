import React, { Component } from 'react';

import logo from './../../assets/img/logo.png';

class DefaultHeader extends Component {
    render() {
        return (
            <header>
                <div className="logo">
                    <a href="#">
                        <img src={logo} alt="Ladsgn Logo" />
                    </a>
                </div>

                <div className="navbar-nav">
                    <div className="searchbox">
                        <input type="text"/>
                        <button type="button">•••</button>
                    </div>

                    <div className="user">
                        <a href="#">dondeedaga</a>

                        <button>Log out</button>
                    </div>
                </div>
                
            </header>
        )
    }
}

export default DefaultHeader;