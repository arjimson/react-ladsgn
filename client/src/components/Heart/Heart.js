import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import './Heart.scss';

const Heart = ({ ifLiked, post, likeHandler, unLikeHandler }) => {
    const [active, setActive] = useState(ifLiked);

    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        <>
            {isAuthenticated ? ifLiked ?
                <div className={'heart ' + (ifLiked ? 'active' : '')} onClick={() => { setActive(!active); unLikeHandler(post._id, 'juliecabria') }} ></div>
                :
                <div className={'heart ' + (ifLiked ? 'active' : '')} onClick={() => { setActive(!active); likeHandler(post._id, 'juliecabria') }} ></div>
                : null
            }
        </>
    )
}

export default Heart;