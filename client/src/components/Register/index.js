import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleRegister, registerUserAction } from '../../actions/authActions'

function Register() {
    const { isRegisterShow, isLoginLoading, isAuthenticated } = useSelector(state => state.auth)
    const error = useSelector(state => state.error)
    const dispatch = useDispatch()

    // console.log(error, "error");

    const [register, setRegister] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        password2: "",
        msg: null
    })

    const { lastName, firstName, email, password, password2 } = register

    useEffect(() => {
        if (error.id === 'REGISTER_FAIL') {
            setRegister({
                ...register,
                msg: error.msg
            })
        } else {
            setRegister({
                ...register,
                msg: null
            })
        }

        if (!isRegisterShow) {
            setRegister({
                lastName: "",
                firstName: "",
                email: "",
                password: "",
                password2: "",
                msg: null
            })
        }
    }, [error, isRegisterShow])





    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            lastName,
            firstName,
            email,
            password
        }
        dispatch(registerUserAction(newUser));
    }

    const handleInputOnchange = (e) => {
        setRegister({
            ...register
            , [e.target.name]: e.target.value
        })
    }

    const handleRegisterButton = () => {

    }

    return (
        <form onSubmit={(e) => handleRegisterSubmit(e)}>
            <div style={myStyle.registerModal} className={isRegisterShow ? "" : "modal-hidden"} >
                <div style={{ marginBottom: "10px" }}>
                    <i class="fas fa-times-circle" style={{ position: "absolute", right: "10px", color: "#fff", cursor: "pointer" }}
                        onClick={() => dispatch(toggleRegister)}></i>
                </div>
                <label style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "20px" }}>Create a New Account</label>
                {register.msg && <p style={{ color: "#fff", fontSize: ".8rem", margin: "5px 0px" }}>{register.msg}</p>}
                <input type="text" style={myStyle.loginTextbox} placeholder="firstName" name="firstName" value={firstName} onChange={(e) => handleInputOnchange(e)} />
                <input type="text" style={myStyle.loginTextbox} placeholder="lastName" name="lastName" value={lastName} onChange={(e) => handleInputOnchange(e)} />
                <input type="text" style={myStyle.loginTextbox} placeholder="email" name="email" value={email} onChange={(e) => handleInputOnchange(e)} />
                <input type="password" style={myStyle.loginTextbox} placeholder="password" name="password" value={password} onChange={(e) => handleInputOnchange(e)} />
                <input type="password" style={myStyle.loginTextbox} placeholder="confirm password" name="password2" value={password2} onChange={(e) => handleInputOnchange(e)} />
                <button style={{ margin: "10px 0px", width: "100%", fontSize: "1rem" }}>CREATE MY ACCOUNT</button>
            </div>
        </form>
    )
}

const loginValidation = (val) => {
    const { lastName, firstName, email, password, password2 } = val
    let err = [];

    if (!lastName || !firstName || !email || !password || !password2) {
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

export default Register