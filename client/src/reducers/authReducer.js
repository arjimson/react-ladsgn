import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    TOGGLE_LOGIN_MODAL,
    TOGGLE_REGISTER_MODAL,
    LOGIN_LOADING,
    REGISTER_LOADING
} from '../actions/types'


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    isLoginLoading: false,
    isLoginShow: false,
    isRegisterShow: false,
    isRegisterLoading: false,
    msg: null
}

export default function(state = initialState, { type, payload }) {
    switch(type) {
        case TOGGLE_REGISTER_MODAL:
            return {
                ...state,
                isRegisterShow: !state.isRegisterShow,
                isLoginShow: false
            }
        case TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                isLoginShow: !state.isLoginShow,
                isRegisterShow: false
            }
        case LOGIN_LOADING:
            return {
                ...state,
                isLoginLoading: true
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false
               
            }  
        case REGISTER_LOADING:
            return {
                ...state,
                isRegisterLoading: true
            }    
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoginShow: false,
                isRegisterShow: false,
                isRegisterLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isLoginLoading: false
            }
        default:
            return state
    }
}

