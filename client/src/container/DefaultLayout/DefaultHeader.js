import React from 'react';
import logo from './../../assets/img/logo.png'

import { toggleLogin, toggleRegister, logout } from '../../actions/authActions'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from '../../components/Login/'
import RegisterForm from '../../components/Register/'


const DefaultHeader = () => {

    const { isAuthenticated, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // links for authenticated users
    const authLinks = (
        <>
            <strong><a href="/">{user ? `Welcome ${user.firstName}` : ''}</a> </strong>
            <button onClick={() => dispatch(logout)}>Log out</button>
        </>
    )
    // links for guest/logout users
    const guestLinks = (
        <>
            <button onClick={() => dispatch(toggleRegister)}>Register</button>
            <button onClick={() => dispatch(toggleLogin)}>Log in</button>
        </>

    )

    return (
        <header>
            <div className="logo">
                <a href="/">
                    <img src={logo} alt="Ladsgn Logo" />
                </a>
            </div>
            <div className="navbar-nav">
                <div className="searchbox">
                    <input type="text" />
                    <button type="button">•••</button>
                </div>
                <div className="user" style={{ position: "relative" }}>
                    {isAuthenticated ? authLinks : guestLinks}
                    <LoginForm />
                    <RegisterForm />
                </div>
            </div>
        </header>
    )
}

export default DefaultHeader;