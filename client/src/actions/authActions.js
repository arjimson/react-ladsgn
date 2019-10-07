import axios from 'axios'
import { returnErrors } from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_LOADING,
    REGISTER_FAIL,
    TOGGLE_LOGIN_MODAL,
    TOGGLE_REGISTER_MODAL,
    LOGIN_LOADING
} from './types'

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })
    // get token from localstorage
    const token = getState().auth.token
    console.log(token, "token")
    // headers
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }

    axios.get('/api/auth/user', config)
        .then(res => dispatch({
            type: USER_LOADED
            , payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: AUTH_ERROR })
        })
}

export const toggleLogin = {
    type: TOGGLE_LOGIN_MODAL
}

export const toggleRegister = {
    type: TOGGLE_REGISTER_MODAL
}

export const loginUserAction = ({ email, password }) => dispatch => {
    dispatch({
        type: LOGIN_LOADING
    })
    console.log(email, password)

    // headers 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        email, password
    })

    console.log(body)

    axios.post('/api/auth/signin', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, 'REGISTER_FAIL'))
            dispatch(({
                type: LOGIN_FAIL
            }))
        })
}

export const registerSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        payload: data.data
    }
}

export const registerUserAction = ({ firstName, lastName, email, password }) => dispatch => {
    dispatch({
        type: REGISTER_LOADING
    })
    // headers 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        firstName, lastName, email, password
    })

    axios.post('/api/users/signup', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            // dispatch(returnErrors(err.response.msg, err.response.status, 'REGISTER_FAIL'))
            dispatch(({
                type: REGISTER_FAIL
            }))
        })

}

export const logout = {
    type: LOGOUT_SUCCESS
}