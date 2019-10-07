import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLogin, toggleRegister, loginUserAction } from '../../actions/authActions'

export default function () {
    const { isLoginShow, isAuthenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (isAuthenticated) {
            setLogin({
                email: "",
                password: ""
            })
        }
    }, [isAuthenticated])

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const { email, password } = login
        const user = {
            email, password
        }
        const isValid = loginValidation(user)
        if(isValid.length > 0) {
           return setErrors(isValid)
        }
        dispatch(loginUserAction(user))
    }

    const handleInputOnchange = (e) => {
        setLogin({
            ...login
            , [e.target.name]: e.target.value
        })
    }

    return (
        <form onSubmit={(e) => handleLoginSubmit(e)}>
            <div style={myStyle.loginModal} className={isLoginShow ? "" : "modal-hidden"} >
                <div style={{ marginBottom: "10px" }}>
                    <i className="fas fa-times-circle" style={{ position: "absolute", right: "10px", color: "#fff", cursor: "pointer" }}
                        onClick={() => dispatch(toggleLogin)}></i>
                </div>
                <label style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "20px" }}>LOG IN</label>
                {errors.length > 0 && errors.map((err,index) => <p key={index} style={{ color: "#fff", fontSize: ".8rem", margin: "5px 0px" }}>{err.msg}</p>)}
                <input type="text" style={myStyle.loginTextbox} value={login.email} placeholder="username" name="email" onChange={(e) => handleInputOnchange(e)} />
                <input type="text" style={myStyle.loginTextbox} value={login.password} placeholder="password" name="password" onChange={(e) => handleInputOnchange(e)} />

                <span><a href="#" style={myStyle.loginLinks}>Forget username?</a></span>{" "}
                <span><a href="#" style={myStyle.loginLinks}>Forget password?</a></span>
                <button style={{ margin: "10px 0px", width: "100%", fontSize: "1.5rem" }}>LOG IN</button>
                <span ><a href="#" style={{ color: "#fff", textAlign: "center", fontSize: ".8rem", cursor: "pointer" }}
                    onClick={() => dispatch(toggleRegister)}>No account yet? Register here!</a></span>
            </div>
        </form>
    )
}

const loginValidation = (val) => {
    let err = [];
    if (!val.email || !val.password) {
        err.push({
            msg: "Please fill in all fields!"
        })
    }
    return err;
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
