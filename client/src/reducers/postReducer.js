import { 
    GET_POSTS
    ,ADD_POST
    ,POST_LOADING
    ,GET_POSTS_SUCCESS
    ,GET_POSTS_FAIL
} from '../actions/types'

const initialState = {
    posts: [],
    isPostLoading: false
}

export default function(state = initialState, { type, payload} ) {
    switch(type) {
        case GET_POSTS:
            return {
                ...state,
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, payload]
            }
        case POST_LOADING :
            return {
                ...state,
                isPostLoading: true
            }
        case GET_POSTS_SUCCESS: 
            return {
                ...state,
                posts: payload
            }
        default:
            return state
    }
}