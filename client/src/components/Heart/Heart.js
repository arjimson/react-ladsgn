import React, { useState } from 'react';

import './Heart.scss';

const Heart = ({ ifLiked, post, likeHandler, unLikeHandler }) => {
    const [active, setActive] = useState(ifLiked);

    return (
        <>
            {ifLiked ?
                <div className={'heart ' + (ifLiked ? 'active' : '')} onClick={ () => {setActive(!active); unLikeHandler(post._id, 'juliecabria') } } ></div>
                :
                <div className={'heart ' + (ifLiked ? 'active' : '')} onClick={ () => {setActive(!active); likeHandler(post._id, 'juliecabria') } } ></div>
            }
        </>
    )
}

export default Heart;