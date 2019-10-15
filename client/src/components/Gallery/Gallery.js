import React, { useState } from 'react';
import axios from 'axios';

import Modal from './../Modal/Modal';

import './Gallery.scss';

const Gallery = ({ posts }) => {
    const columns = 4;
    const [post, setPost] = useState(null);
    const [isModalOpen, toggleModal] = useState(false);

    const highlightArtworkHandler = (id) => {
        toggleModal(!isModalOpen);
        axios.get('http://localhost:5000/api/posts/' + id)
        .then(res => {
            setPost(res.data);
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

            {post && <Modal isOpen={isModalOpen} toggle={toggleModal} post={post} />}
        </>
    )

}

export default Gallery;