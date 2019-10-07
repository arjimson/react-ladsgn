import { GET_POSTS, ADD_POST } from './types'

export const getPostsAction = () => {
    return {
        type: GET_POSTS
    }
}

export const addPostAction = (post) => ({
    type: ADD_POST
    ,payload: post
})