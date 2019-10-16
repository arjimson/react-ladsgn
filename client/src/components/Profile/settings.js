import React from 'react';
import { Link, Route } from 'react-router-dom'
import EditProfile from './editProfile'
import AccountSettings from './account-settings'

const Settings = (props) => {
    return (
        <div className="pdash_con">
            <div className="pdash_wrp">
                <Nav {...props} />
            </div>
        </div>
    )
}


const Nav = ({ match: { path } }) => {
    return (
        <div style={{display: "flex"}}>
            <div style={{border: "1px solid black", flex: 1}}>
                <ul>
                    <li><Link to={`${path}/edit-profile`}>Edit Profile</Link></li>
                    <li><Link to={`${path}/account-settings`}>Account Settings</Link></li>
                </ul>
            </div>
            <div style={{border: "1px solid black", flex: 3}}>
                <Route path="/settings/edit-profile" component={EditProfile} />
                <Route path="/settings/account-settings" component={AccountSettings} />
            </div>
        </div>
    )
}




export default Settings