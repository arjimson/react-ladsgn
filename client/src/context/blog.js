import React from 'react'
import axios from 'axios'

// Context
const State = React.createContext()

const Dispatch = React.createContext()

export const initialState = {
    blogPosts: [],
    isFetching: false
}

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCHING_BLOGSPOST':
            return {
                ...state,
                isFetching: true
            }
        case 'FETCH_BLOGSPOST_SUCCESS':
            return {
                ...state,
                isFetching: false,
                blogPosts: action.payload
            }
        case 'ADD_BLOGPOST':
            return {
                ...state,
                blogPosts: [...state.blogPosts, action.payload]
            }
        case 'DEL_BLOGPOST':
            return {
                ...state,
                blogPosts: [...state.blogPosts, action.payload]
            }
        default:
            return state;
    }
}

// Provider
const Provider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        dispatch({ type: 'FETCHING_BLOGSPOST' })
        const fetchData = async () => {
            const result = await axios('https://jsonplaceholder.typicode.com/posts');
            const data = await dispatch({ type: 'FETCH_BLOGSPOST_SUCCESS', payload: result.data })
        }
        fetchData()
    }, []);
    
    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
        </State.Provider>
    )
}


export const Blog = {
    State,
    Dispatch,
    Provider,
}