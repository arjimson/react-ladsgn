import React, { useState } from 'react';

import './Heart.scss';

const Heart = () => {
    const [active, setActive] = useState(false);

    return (
        <>
            <div className={'heart ' + (active ? 'active' : '')} onClick={ () => setActive(!active) } ></div>
        </>
    )
}

export default Heart;