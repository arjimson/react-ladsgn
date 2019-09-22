import React, { Component } from 'react';

import logo from './../../assets/img/logo.png';

class DefaultHeader extends Component {
    render() {
        return (
            <header>
                <div class="logo">
                    <a href="#">
                        <img src={logo} alt="Ladsgn Logo" />
                    </a>
                </div>

                <div class="navbar-nav">
                    <div class="searchbox">
                        <input type="text"/>
                        <button type="button">•••</button>
                    </div>

                    <div class="user">
                        <a href="#">dondeedaga</a>

                        <button>Log out</button>
                    </div>
                </div>
                
            </header>
        )
    }
}

export default DefaultHeader;