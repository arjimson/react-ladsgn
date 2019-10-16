import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'


export default function (ComposedComponent) {
    
    const Authenticate = (props) => {
        const authenticated = useSelector(state => state.auth.isAuthenticated)
        useEffect(() => {
            // if(!authenticated) {
            //     props.history.push("/")
            // }

        })

        console.log(authenticated, 'authenticated')

        console.log(props, 'props')
        return (
            <ComposedComponent {...props} />
        )
    }
    return Authenticate;
}

