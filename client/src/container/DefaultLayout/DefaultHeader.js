import React, { useState } from 'react';
import logo from './../../assets/img/logo.png'
import { Link } from 'react-router-dom'

import { toggleLogin, toggleRegister, logout } from '../../actions/authActions'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from '../../components/Login/'
import RegisterForm from '../../components/Register/'
import UploadForm from '../../components/Upload'


const DefaultHeader = () => {
    const [toggleUploadBtn, setToggleUploadBtn] = useState(false)
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // links for authenticated users
    const authLinks = (
        <>
            <strong><Link to={`/user/${user.userName}`}>{user.userName}</Link> </strong>
            <button onClick={() => setToggleUploadBtn(!toggleUploadBtn)}>Upload</button>
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
                    <UploadForm
                        toggleUploadBtn={toggleUploadBtn}
                        setToggleUploadBtn={setToggleUploadBtn}
                    />

                </div>
            </div>
        </header>
    )
}

export default DefaultHeader;