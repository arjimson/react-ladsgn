import React from 'react'
import { useSelector } from 'react-redux'

const EditProfile = (props) => {
    const user = useSelector(state => state.auth.user)
    return (
        <>
            <h1>Edit Profile</h1>
            <label>First Name</label>
            <input type="text" value={user.firstName}/>
            <label>Last Name</label>
            <input type="text" value={user.lastName}/>
            <label>Username</label><br/>
            www.ladbrokessgn.com/<input type="text" value={user.userName}/>
        </>

    )
}

export default EditProfile