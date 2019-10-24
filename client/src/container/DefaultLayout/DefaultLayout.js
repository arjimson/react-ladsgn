import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from './../../components/Modal/Modal';
import DefaultHeader from './DefaultHeader';
import Gallery from './../../components/Gallery/Gallery';

import Heart from './../../components/Heart/Heart';

const DefaultLayout = () => {
    const [selectedFile, setSelectFile] = useState(null);
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [start, setStart] = useState(0);
    const [count, setCount] = useState(8);
    const [comment, setComment] = useState(null);
    const [isModalOpen, toggleModal] = useState(false);

    useEffect(() => {
        axios.get(`/api/posts?count=${count}&start=${start}`)
        .then(res => {
            setPosts(res.data)
        });
    }, [])

    const fetchImagesHandler = () => {
        setStart(start + count);
        axios.get(`/api/posts?count=${count}&start=${start}`)
        .then(res => {
            setPosts(posts.concat(res.data));
        });
    }

    const onChangeHandler = e => {
        setSelectFile(e.target.files[0])
    }

    const onChangeCommentHandler = e => {
        setComment(e.target.value)
    }

    const onClickHandler = e => {
        const data = new FormData();
        data.append('selectedFile', selectedFile);

        axios.post('http://localhost:5000/api/posts/', data)
        .then(response => {
            console.log(response)
        })
    }

    const onClickCommentHandler = (e, id, user) => {
        const data = {
            id: id,
            comment: comment,
            user: user
        }

        if (e.keyCode === 13) {
            axios.post('http://localhost:5000/api/posts/comment', data)
            .then(res => {
                setComment('')
                setPost(res.data)
            })
        }
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
            setPost(res.data)
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

                <Heart/>

                <section className="gallery-wrapper">
                    <Gallery posts={posts} highlightArtworkHandler={highlightArtworkHandler} fetchImagesHandler={fetchImagesHandler}/>

                    <input type="file" onChange={onChangeHandler} />
                    <button type="button" onClick={() => onClickHandler()}>upload</button>
                </section>
            </div>

            <Modal
                isOpen={isModalOpen}
                toggle={toggleModal}
                post={post}
                likeHandler={likeHandler}
                unLikeHandler={unLikeHandler}
                comment={comment}
                onChangeCommentHandler={onChangeCommentHandler}
                onClickCommentHandler={onClickCommentHandler}
            />
        </>
    )
}

export default DefaultLayout;