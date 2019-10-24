import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import './Modal.scss';

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = event => {
          // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
        
            handler(event);
        };
    
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
    
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, []);
}

const findIfLiked = (arr, id) => {
    return arr.some(e => e['user'] === id);
}

const Modal = ({ isOpen, toggle, post, likeHandler, unLikeHandler, comment, onChangeCommentHandler, onClickCommentHandler }) => {
    const ref = useRef();
    useOnClickOutside(ref, () => toggle(false));

    return (
        <div className="modal" style={{ display: (isOpen ? 'block' : 'none') }}> 
            <div className="modal-body">

                {post && (
                    <div className="media" ref={ref} >
                        <div className="media__img">
                            <img src={require('../../assets/uploads/' + post.image_path)} />
                            <div className="like">
                                

                                {post && findIfLiked(post.likes, 'remolalata') ?
                                    <div>
                                        <span key={post.likes.length}>{post.likes.length}</span>
                                        <button type="button" onClick={(id, user) => unLikeHandler(post._id, 'remolalata')}>unlike</button>
                                    </div>
                                    :
                                    <div>
                                        <span key={post.likes.length}>{post.likes.length}</span>
                                        <button type="button" onClick={(id, user) => likeHandler(post._id, 'remolalata')}>like</button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="media__body">
                            <h1>{post.title}</h1>
                            <h2>Happy Skin x Disney</h2>
                            <p>by Dondee Lois Villaneuva, 2017</p>
                            <p>
                                <span>Rationale:</span>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quibusdam accusantium officiis tempora dignissimos natus, quis asperiores necessitatibus saepe ab. Obcaecati illo sapiente commodi iusto, temporibus architecto accusantium adipisci modi?
                            </p>
                            <ul>
                                <li><a href="#">#graphicdesign</a></li>
                                <li><a href="#">#photoshop</a></li>
                                <li><a href="#">#photomanipulation</a></li>
                                <li><a href="#">#composition</a></li>
                            </ul>

                            <hr/>

                            <div className="comment">
                                <div className="comment__list">
                                    <ul>
                                        {post ? post.comments.map(comment => 
                                            <li key={comment._id}>
                                                <span>{comment.user}</span>
                                                <p>{comment.comment}</p>
                                            </li>
                                        ) :
                                            ''
                                        }
                                    </ul>
                                </div>

                                <input
                                    type="text"
                                    onChange={onChangeCommentHandler}
                                    onKeyDown={(e) => onClickCommentHandler(e, post._id, 'remolalata')}
                                    value={comment}
                                    placeholder="Write a comment..."
                                />
                            </div>

                        </div>
                    </div>
                )}
                    
                
            </div>
        </div>
    );
}

export default Modal;