import {
    GET_POSTS
    , ADD_POST
    , POST_LOADING
    , GET_POSTS_SUCCESS
    , GET_POSTS_FAIL
} from './types'

import axios from 'axios'

export const getPostsAction = () => dispatch => {
    dispatch({ type: POST_LOADING })
    axios.get('/api/posts')
        .then(res => {
            dispatch({
                type: GET_POSTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(({
                type: GET_POSTS_FAIL
            }))
        })

}

export const addPostAction = (post) => ({
    type: ADD_POST
    , payload: post
})

export const linkPostAction = (user) => dipatch => ({
   
})