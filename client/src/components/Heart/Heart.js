import React from 'react';

import './Heart.scss';

const Heart = () => {
    return (
        <>
            <input type="checkbox" id="toggle-heart" />
            <label for="toggle-heart">❤</label>
        </>
    )
}

export default Heart;