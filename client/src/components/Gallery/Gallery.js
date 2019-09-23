import React from 'react';

import './Gallery.scss';

const gallery = props => {
    const { photos, columns, handleOpenModal } = props;

    const columnWrapper = {};
    const result = [];

    for (let i = 0; i < columns; i++ ) {
        columnWrapper[`column${i}`] = [];
    }

    for (let i = 0; i < photos.length; i++) {
        const columnIndex = i % columns;
        columnWrapper[`column${columnIndex}`].push(
            <a href="#" onClick={handleOpenModal} key={i}>
                <img src={photos[i].img} />
            </a>
        )
    }

    for (let i = 0; i < columns; i++) {
        result.push(
            <div className="gallery__item" key={i}>
                {columnWrapper[`column${i}`]}
            </div>
        )
    }

    return (
        <div className="gallery">
            {result}
        </div>
    )
}


export default gallery;