import React, { Component } from 'react';

import logo from './../../assets/img/logo.png';

import { Login } from '../../context/GlobalState'

const DefaultHeader = () => {
    // scoped States
    const [loginForm, setLoginForm] = React.useState(false);
    const [credentials, setCredentials] = React.useState({
        username: "",
        password: "",
        firstname: "",
        surname: "",
        email: "",
        password: "",
        password2: ""
    });
    const [loginErrors, setLoginErrors] = React.useState([]);
    const [regErrors, setRegErrors] = React.useState([]);

    const [registerForm, setRegisterForm] = React.useState(false);

    // context
    const loginState = React.useContext(Login.State)
    const loginDispatch = React.useContext(Login.Dispatch)
    const { registerModalOpen, loginModalOpen } = loginState

    // lifecycle
    React.useEffect(() =>
        console.log(loginState), [])

    const isRegForm = registerForm ? "modal-show" : "modal-hidden";
    const isLoginForm = loginForm ? "modal-show" : "modal-hidden";

    // methods
    const handleLoginButton = () => {
        setLoginForm(!loginForm)
        setRegisterForm(false)
    }

    const handleRegisterButton = () => {
        setRegisterForm(!registerForm)
        setLoginForm(false)
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const values = {
            username: credentials.username,
            password: credentials.password
        }
        const formValid = isValid(values)
        console.log(formValid.length)
        if (formValid.length > 0) {
            setLoginErrors(formValid)
        }

    }

    const registerSubmit = (e) => {
        const { firstname, surname, email, password, password2 } = credentials;
        e.preventDefault();
        const values = {
            firstname,
            surname,
            email,
            password,
            password2
        }
        const formValid = isRegValid(values)
        if (formValid.length > 0) {
            setRegErrors(formValid);
        }

        console.log(formValid)
    }

    const handleOnChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    console.log(credentials)

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
                    <button onClick={handleLoginButton}>Log in</button>
                    <form onSubmit={(e) => loginSubmit(e)}>
                        <div style={myStyle.loginModal} className={isLoginForm}>
                            <div style={{ marginBottom: "10px" }}>
                                <i class="fas fa-times-circle" style={{ position: "absolute", right: "10px", color: "#fff", cursor: "pointer" }}
                                    onClick={handleLoginButton}></i>
                            </div>
                            <label style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "20px" }}>LOG IN</label>
                            <input type="text" style={myStyle.loginTextbox} placeholder="username" name="username" onChange={(e) => handleOnChange(e)} />
                            <input type="text" style={myStyle.loginTextbox} placeholder="password" name="password" onChange={(e) => handleOnChange(e)} />
                            {loginErrors.length > 0 && loginErrors.map(err => <p style={{ color: "#fff", fontSize: ".8rem", margin: "5px 0px" }}>{err.msg}</p>)}
                            <span><a style={myStyle.loginLinks}>Forget username?</a></span>{" "}
                            <span><a style={myStyle.loginLinks}>Forget password?</a></span>
                            <button style={{ margin: "10px 0px", width: "100%", fontSize: "1.5rem" }}>LOG IN</button>
                            <span ><a style={{ color: "#fff", textAlign: "center", fontSize: ".8rem", cursor: "pointer" }}
                                onClick={handleRegisterButton}>No account yet? Register here!</a></span>
                        </div>
                    </form>

                    <form onSubmit={(e) => registerSubmit(e)}>
                        <div style={myStyle.registerModal} className={isRegForm}>
                            <div style={{ marginBottom: "10px" }}>
                                <i class="fas fa-times-circle" style={{ position: "absolute", right: "10px", color: "#fff", cursor: "pointer" }}
                                    onClick={handleRegisterButton}></i>
                            </div>
                            <label style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "20px" }}>Create a New Account</label>
                            {regErrors.length > 0 && regErrors.map(err => <p style={{ color: "#fff", fontSize: ".8rem", margin: "5px 0px" }}>{err.msg}</p>)}
                            <input type="text" style={myStyle.loginTextbox} placeholder="firstname" name="firstname" onChange={(e) => handleOnChange(e)} />
                            <input type="text" style={myStyle.loginTextbox} placeholder="surname" name="surname" onChange={(e) => handleOnChange(e)} />
                            <input type="text" style={myStyle.loginTextbox} placeholder="email" name="email" onChange={(e) => handleOnChange(e)} />
                            <input type="text" style={myStyle.loginTextbox} placeholder="password" name="password" onChange={(e) => handleOnChange(e)} />
                            <input type="text" style={myStyle.loginTextbox} placeholder="confirm password" name="password2" onChange={(e) => handleOnChange(e)} />
                            <button style={{ margin: "10px 0px", width: "100%", fontSize: "1rem" }}>CREATE MY ACCOUNT</button>
                        </div>
                    </form>
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

const isValid = (val) => {
    let err = [];
    if (!val.username || !val.password) {
        err.push({
            msg: "Please fill in all fields!"
        })
    }
    return err;
}

const isRegValid = (values) => {
    const { firstname, surname, email, password, password2 } = values;
    let err = [];
    if (!firstname || !surname || !email || !password || !password2) {
        err.push({
            msg: "Please fill in all fields!"
        })
    }
    if (password !== password2) {
        err.push({
            msg: "Password do not match!"
        })
    }

    return err;
}
export default DefaultHeader;