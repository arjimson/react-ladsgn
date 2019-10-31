import React, { useState, useEffect } from 'react';
import axios from 'axios';
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { getPostsAction } from '../../actions/postActions'

import Modal from './../../components/Modal/Modal';
import DefaultHeader from './DefaultHeader';
import Gallery from './../../components/Gallery/Gallery';

import Upload from '../../components/Upload';

const DefaultLayout = () => {
    const dispatch = useDispatch()

    const { user: { id: userId } } = useSelector(state => state.auth)
    const { posts, isPostLoading } = useSelector(state => state.posts)

    const [post, setPost] = useState(null);
    const [comment, setComment] = useState(null);
    const [isModalOpen, toggleModal] = useState(false);
    // const [posts, setPosts] = useState([]);
    // const [start, setStart] = useState(0);
    // const [count, setCount] = useState(8);

    useEffect(() => {
        dispatch(getPostsAction())
    }, [])

    console.log(userId, 'redux user')
    console.log(posts, 'redux posts')

    // const fetchImagesHandler = () => {
    //     setStart(start + count);
    //     axios.get(`/api/posts?count=${count}&start=${start}`)
    //         .then(res => {
    //             setPosts(res.data);
    //         });
    // }

    const onChangeCommentHandler = e => {
        setComment(e.target.value)
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

    const likeHandler = (id) => {
        console.log(id, userId);
        const newLike = {
            id: id,
            user: userId
        }
        axios.post('http://localhost:5000/api/posts/like', newLike)
            .then(res => {
                console.log(res)
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

    let modal;
    if (post) {
        modal = <Modal
            isOpen={isModalOpen}
            toggle={toggleModal}
            post={post}
            likeHandler={likeHandler}
            unLikeHandler={unLikeHandler}
            comment={comment}
            onChangeCommentHandler={onChangeCommentHandler}
            onClickCommentHandler={onClickCommentHandler}
        />
    }

    let gallery;
    if (posts.length > 0) {
        gallery = <Gallery posts={posts} highlightArtworkHandler={highlightArtworkHandler} />
    } else {
        gallery = <p>No gallery yet</p>
    }

    return (
        <>
            <DefaultHeader />

            <div className="content">
                <section className="home">
                    <div className="tagline"></div>
                    <div className="ladbrokes"></div>
                </section>

                <section className="gallery-wrapper">

                    {gallery}


                </section>

                {modal}
            </div>
        </>
    )
}

export default DefaultLayout;