import React from 'react'
import { Link } from 'react-router-dom'
// get our fontawesome imports
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'

const Profile = ({ match }) => {

    const userDetails = useSelector(state => state.auth.user)

    // console.log(userDetails && userDetails.id)

    const userFullName = `${userDetails.firstName} ${userDetails.lastName}`

    return (
        <div className="pdash_con">
            <div className="pdash_wrp">
                {/* Actions */}
                <div className="pdash_act">
                    <div className="act_con">
                        <Link to="/settings">
                            <div className="act_wrapper">
                                <i class="fas fa-pen fa-lg" style={{ verticalAlign: "center" }}></i>
                            </div>
                        </Link>

                        <div className="act_wrapper">
                            <i class="fas fa-upload fa-lg"></i>
                        </div>
                    </div>
                </div>
                {/* Profile */}
                <div className="pdash_prof">
                    <div className="pt-1">
                        <h1 className="mrgn-0">{userFullName}</h1>
                        <span>0 Followers</span>{" "}<span>1 Following</span>
                    </div>
                    <div className="prof_pic">
                        <img src="https://picsum.photos/seed/picsum/120/120" />
                    </div>
                </div>
            </div>
        </div>

    )
}



export default Profile