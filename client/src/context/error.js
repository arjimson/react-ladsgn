import React from 'react'
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const State = React.createContext()
const Dispatch = React.createContext()

export const initialState = {
    msg: {},
    status: null,
    id: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            }
        default:
            return state

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


export const Error = {
    State,
    Dispatch,
    Provider,
}

