import { GET_POSTS, ADD_POST } from '../actions/types'

const initialState = {
    posts: [
        { id: 1, name: "arjimson", age: "25"}
        ,{ id: 2, name: "arjimson", age: "25"}
    ]
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
        default:
            return state
    }
}