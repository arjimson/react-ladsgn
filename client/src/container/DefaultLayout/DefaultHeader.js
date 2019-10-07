import React, { Component } from 'react';
import axios from 'axios';
import logo from './../../assets/img/logo.png'

import { toggleLogin, logout } from '../../actions/authActions'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from '../../components/Login/'
import RegisterForm from '../../components/Register/'


const DefaultHeader = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    return (
        <header>
            <div className="logo">
                <a href="#">
                    <img src={logo} alt="Ladsgn Logo" />
                </a>
            </div>

            <div className="navbar-nav">
                <div className="searchbox">
                    <input type="text" />
                    <button type="button">•••</button>
                </div>

                <div className="user" style={{ position: "relative" }}>
                    {isAuthenticated && <a href="#">{user.firstName}</a>}
                    {isAuthenticated ? <button onClick={() => dispatch(logout)}>Log out</button> : <button onClick={() => dispatch(toggleLogin)}>Log in</button>}
                    <LoginForm />
                    <RegisterForm />

                </div>
            </div>
        </header>
    )
}

export default DefaultHeader;