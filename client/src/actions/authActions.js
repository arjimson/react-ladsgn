import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import { returnErrors, clearErrors } from './errorActions'
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
    LOGIN_LOADING,
    CLEAR_ERRORS
} from './types'

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    console.log('laoduser')
    dispatch({ type: USER_LOADING })
    console.log(tokenConfig(getState))
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res =>

            dispatch({
                type: USER_LOADED
                , payload: res.data
            })
        )
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

export const loginUserAction = ({ email, password }) => (dispatch, getState) => {
    dispatch({
        type: LOGIN_LOADING
    })
    const body = JSON.stringify({
        email, password
    })
    axios.post('/api/auth/signin', body, tokenConfig(getState))
        .then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token)
            setAuthorizationToken(token)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }

        )
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, 'LOGIN_FAIL'))
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

export const registerUserAction = ({ firstName, lastName, email, password, userName }) => (dispatch, getState) => {
    dispatch({
        type: REGISTER_LOADING
    })
    const body = JSON.stringify({
        firstName, lastName, email, password, userName
    })

    // console.log(body)
    axios.post('/api/users/signup', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS
                ,payload: res.data
            })
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })

}

export const logout = dispatch => {
    dispatch({
        type: LOGIN_LOADING
    })
    setAuthorizationToken(false)
    localStorage.removeItem('jwtToken')
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

// Setup config/headers and token
export const tokenConfig = getState => {
    // Token from localstorage
    const token = getState().auth.token;
    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token
    }
    return config;
}