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

const Modal = ({ isOpen, toggle, post, likeHandler }) => {
    console.log(post)
    const ref = useRef();
    const likes = post.likes.length;
  
    useOnClickOutside(ref, () => toggle(false));
  
    return (
        <div className="modal" style={{ display: (isOpen ? 'block' : 'none') }}>
            <div className="modal-body">

                {post && (
                    <div className="media" ref={ref} >
                        <div className="media__img">
                            <img src={require('../../assets/uploads/' + post.image_path)} />
                            <div className="like">
                                <button type="button" onClick={(e) => likeHandler(post._id)}>like {likes}</button>
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

                            <div className="comment">
                                <div className="comment__list">
                                    <ul>
                                        <li>
                                            <span>User 1</span>
                                            <p>Lorem ipsum dolor sit amet consectetur!</p>
                                        </li>
                                        <li>
                                            <span>User 2</span>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </li>
                                        <li>
                                            <span>User 4</span>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </li>
                                        <li>
                                            <span>User 3</span>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </li>
                                        <li>
                                            <span>User 5</span>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </li>
                                    </ul>
                                </div>

                                <input type="text"/>
                            </div>

                        </div>
                    </div>
                )}
                    
                
            </div>
        </div>
    );
}

export default Modal;