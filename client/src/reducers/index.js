import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import postReducer from './postReducer'


export default combineReducers({
    posts: postReducer,
    error: errorReducer,
    auth: authReducer
})