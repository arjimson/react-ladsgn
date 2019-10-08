import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Gallery.scss';

const Gallery = () => {
    const [posts, setPosts] = useState([]);
    const [columns, setColumns] = useState('4');
    const [count, setCount] = useState(1);

    useEffect(() => {
        console.log('haha')
        axios.get('http://localhost:5000/api/posts')
        .then(res => {
            setPosts(res.data)
        })
    }, [])

    const haha = () => {
        setCount(count+1);
    }

    const columnWrapper = {};
    const result = [];
    
    for (let i = 0; i < columns; i++ ) {
        columnWrapper[`column${i}`] = [];
    }

    for (let i = 0; i < posts.length; i++) {
        const columnIndex = i % columns;
        columnWrapper[`column${columnIndex}`].push(
            <a href="#" key={i}>
                <img src={require("../../assets/uploads/" + posts[i].image_path)} />
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