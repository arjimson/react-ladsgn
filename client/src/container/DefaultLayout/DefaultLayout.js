import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from './../../components/Modal/Modal';

import DefaultHeader from './DefaultHeader';
import Gallery from './../../components/Gallery/Gallery';

const DefaultLayout = () => {
    const [selectedFile, setSelectFile] = useState(null);
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isModalOpen, toggleModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
        .then(res => {
            setPosts(res.data)
        });
    }, [])

    const onChangeHandler = e => {
        setSelectFile(e.target.files[0])
    }

    const onClickHandler = e => {
        const data = new FormData();
        data.append('selectedFile', selectedFile);

        axios.post('http://localhost:5000/api/posts/', data)
        .then(response => {
            console.log(response)
        })
    }

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

    const likeHandler = (id, user) => {
        axios.post('http://localhost:5000/api/posts/like', {
            params: {
                id: id,
                user: user
            }
        })
        .then(res => {
            setPost(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const unLikeHandler = (id, user) => {
        axios.post('http://localhost:5000/api/posts/unlike', {
            params: {
                id: id,
                user: user
            }
        })
        .then(res => {
            // setPost(res.data)
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <DefaultHeader/>
            
            <div className="content">
                <section className="home">
                    <div className="tagline"></div>
                    <div className="ladbrokes"></div>
                </section>

                <section className="gallery-wrapper">
                    <Gallery posts={posts} highlightArtworkHandler={highlightArtworkHandler} />

                    <input type="file" onChange={onChangeHandler} />
                    <button type="button" onClick={onClickHandler}>upload</button>
                </section>
            </div>

            <Modal isOpen={isModalOpen} toggle={toggleModal} post={post} likeHandler={likeHandler} unLikeHandler={unLikeHandler} />}
        </>
    )
}

export default DefaultLayout;