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
    token: localStorage.getItem('jwtToken'),
    isAuthenticated: false,
    isLoading: false,
    user: {
        id: ''
        ,userName: ''
        ,firstName: ''
        ,lastName: ''
        ,email: ''
    },
    isLoginLoading: false,
    isLoginShow: false,
    isRegisterShow: false,
    isRegisterLoading: false,
    msg: ''
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
            return {
                ...state,
                token: null,
                user: {
                    id: ''
                    ,userName: ''
                    ,firstName: ''
                    ,lastName: ''
                    ,email: ''
                }
                ,msg: payload
                ,isAuthenticated: false
                ,isLoading: false
                ,isLoginLoading: false
            }
        default:
            return state
    }
}

