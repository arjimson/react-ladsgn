import React from 'react'

import axios from 'axios'

// Context
const State = React.createContext()
const Dispatch = React.createContext()

export const initialState = {
    loginModalOpen : false,
    registerModalOpen : false,
    isAuthenticated: false,
    user: null,
    token: null
}

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            // localStorage.setItem("user", JSON.stringify(action.payload.user))
            // localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                ...state,
                isAuthenticated: true,
                loginModalOpen : true
                // user: action.payload.user,
                // token: action.payload.token
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: "",
                token: ""
            }
        default:
            return state;
    }
}

// Provider
const Provider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
        </State.Provider>
    )
}


export const Login = {
    State,
    Dispatch,
    Provider,
}