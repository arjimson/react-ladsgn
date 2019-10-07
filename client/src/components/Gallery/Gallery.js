import React, { useState, useEffect } from 'react';

import './Gallery.scss';

const Gallery = () => {

    const [photos, setPhotos] = useState([
        {
            img: require('../../assets/img/img-1.png')
        },
        {
            img: require('../../assets/img/img-2.png')
        },
        {
            img: require('../../assets/img/img-3.png')
        },
        {
            img: require('../../assets/img/img-4.png')
        },
        {
            img: require('../../assets/img/img-5.png')
        },
        {
            img: require('../../assets/img/img-6.png')
        },
        {
            img: require('../../assets/img/img-7.png')
        },
        {
            img: require('../../assets/img/img-8.png')
        }
    ]);

    const [columns, setColumns] = useState('4');

    const columnWrapper = {};
    const result = [];

    for (let i = 0; i < columns; i++ ) {
        columnWrapper[`column${i}`] = [];
    }

    for (let i = 0; i < photos.length; i++) {
        const columnIndex = i % columns;
        columnWrapper[`column${columnIndex}`].push(
            <a href="#" key={i}>
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

export default Gallery;