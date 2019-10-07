import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPostsAction, addPostAction } from '../actions/postActions'

export default () => {
    const [post, setPost] = useState('')
    const dispatch = useDispatch()

    const posts = useSelector((state) => state.posts)

    const addPost = useCallback(
        (post) => dispatch(addPostAction(post)),
        [dispatch]
    )

    const onChange = event => {
        setPost(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let newPost = {
            id: 3
            , name: post
            , age: "26"
        }
        addPost(newPost)
    }

    const allPosts = posts.posts.map(post => (
        <p>{post.name}</p>
    ));

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={onChange} />
                <button>Add</button>
            </form>
            <div>
               {allPosts}
            </div>
        </>
    )
}
