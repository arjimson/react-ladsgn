import React, { Component } from 'react';

import logo from './../../assets/img/logo.png';

import { Login } from '../../context/GlobalState'

const DefaultHeader = () => {
    const [loginForm, setLoginForm] = React.useState(false);
    const loginState = React.useContext(Login.State)
    const loginDispatch = React.useContext(Login.Dispatch)
    const { registerModalOpen, loginModalOpen } = loginState
    React.useEffect(() =>
        console.log(loginState), [])
// console.log(registerModalOpen)
    const isRegForm = registerModalOpen ? "modal-show" : "modal-hidden";
    const isLoginForm = loginForm ? "modal-show" : "modal-hidden";

    const handleLogin = () => {
        setLoginForm(!loginForm)
    }

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
                    <a href="#">dondeedaga</a>

                    <button onClick={handleLogin}>Log in</button>

                    <div style={myStyle.loginModal} className={isLoginForm}>
                        <div style={{ marginBottom: "10px" }}>
                            <i class="fas fa-times-circle" style={{ position: "absolute", right: "10px", color: "#fff", cursor: "pointer" }}
                            onClick={ () => setLoginForm(!loginForm)}></i>
                        </div>
                        <label style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "20px" }}>LOG IN</label>
                        <input type="text" style={myStyle.loginTextbox} placeholder="username" />
                        <input type="text" style={myStyle.loginTextbox} placeholder="password" />
                        <span><a style={myStyle.loginLinks}>Forget username?</a></span>{" "}
                        <span><a style={myStyle.loginLinks}>Forget password?</a></span>
                        <button style={{ margin: "10px 0px", width: "100%", fontSize: "1.5rem" }}>LOG IN</button>
                        <span ><a style={{ color: "#fff", textAlign: "center", fontSize: ".8rem" }}>No account yet? Register here!</a></span>
                    </div>

                    <div style={myStyle.registerModal} className={isRegForm}>
                        <div style={{ marginBottom: "10px" }}>
                            <i class="fas fa-times-circle" style={{ position: "absolute", right: "10px", color: "#fff", cursor: "pointer" }}></i>
                        </div>

                        <label style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "20px" }}>Create a New Account</label>
                        <input type="text" style={myStyle.loginTextbox} placeholder="firstname" />
                        <input type="text" style={myStyle.loginTextbox} placeholder="surname" />
                        <input type="text" style={myStyle.loginTextbox} placeholder="email" />
                        <input type="text" style={myStyle.loginTextbox} placeholder="password" />
                        <input type="text" style={myStyle.loginTextbox} placeholder="confirm password" />
                        <button style={{ margin: "10px 0px", width: "100%", fontSize: "1rem" }}>CREATE MY ACCOUNT</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

const myStyle = {
    registerModal: {
        display: "block",
        border: "1px solid #e80505",
        width: "300px",
        height: "auto",
        position: "absolute",
        right: "0",
        top: "0",
        borderRadius: "4px",
        padding: "15px 10px",
        background: "linear-gradient(to bottom, #e66a70, #f01e28 100%)"
    },
    loginLinks: {
        color: "#fff",
        margin: "0",
        padding: "0",
        fontSize: ".8rem",

    },
    loginModal: {
        display: "block",
        border: "1px solid #e80505",
        width: "260px",
        height: "auto",
        position: "absolute",
        right: "0",
        top: "0",
        borderRadius: "4px",
        padding: "15px 10px",
        background: "linear-gradient(to bottom, #e66a70, #f01e28 100%)"
    },
    loginTextbox: {
        boxSizing: "border-box",
        width: "100%",
        padding: ".375rem .75rem",
        fontSize: "1rem",
        lineHeight: "1.5",
        color: "#495057",
        backgroundColor: "#fff",
        backgroundClip: "padding-box",
        border: "1px solid #ced4da",
        borderRadius: ".25rem",
        transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
        marginTop: "10px"
    }
}
export default DefaultHeader;