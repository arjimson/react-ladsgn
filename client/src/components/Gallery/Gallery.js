import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from './../Modal/Modal';

import './Gallery.scss';

const Gallery = () => {
    const [posts, setPosts] = useState([]);
    const [columns, setColumns] = useState('4');
    const [isModalOpen, toggleModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
        .then(res => {
            setPosts(res.data)
        })
    }, [])

    const highlightArtworkHandler = (id) => {
        toggleModal(!isModalOpen);
        axios.get('http://localhost:5000/api/posts/' + id)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const columnWrapper = {};
    const result = [];
    
    for (let i = 0; i < columns; i++ ) {
        columnWrapper[`column${i}`] = [];
    }

    for (let i = 0; i < posts.length; i++) {
        const columnIndex = i % columns;
        columnWrapper[`column${columnIndex}`].push(
            <a href="#" key={i} onClick={(_id) => highlightArtworkHandler(posts[i]._id)}>
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
        <>
            <div className="gallery">
                {result}
            </div>

            <button onClick={() => toggleModal(!isModalOpen)}>Toggle Modal</button>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <h1>test</h1>
                <p>Other text that describes what is happening</p>
                <button onClick={() => toggleModal(false)}>toggle</button>
            </Modal>
        </>
    )

}

export default Gallery;