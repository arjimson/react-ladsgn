import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest }, props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    console.log(props, 'props')
    useEffect (()=> {
        // console.log('useeffect')
        if(!isAuthenticated) {

        }


    })
    return isAuthenticated ? 
    <Route {...rest} render={(props)=> <Component {...props} />} />
    : <Redirect to="/" />

 
}





