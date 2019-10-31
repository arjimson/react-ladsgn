import React, { useState } from 'react'
import axios from 'axios'

export default function ({ toggleUploadBtn, setToggleUploadBtn }) {
    const [selectedFile, setSelectFile] = useState(null);
    const [newPost, setNewPost] = useState({
        title: ''
        , description: ''
    })

    const onChangeHandler = e => {
        setSelectFile(e.target.files[0])
    }

    const handleInputChange = e => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }

    const onClickHandler = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('selectedFile', selectedFile);
        data.append('title', newPost.title);
        data.append('description', newPost.description);

        // console.log(post)

        axios.post('http://localhost:5000/api/posts/', data)
            .then(res => {
                console.log(res)
            })
    }

    const modalClass = toggleUploadBtn ? "mdl-upload" : "mdl-upload modal-hidden"

    console.log(newPost)
    return (
        <div className={modalClass} >
            <i className="fas fa-times-circle" style={{ position: "absolute", right: "10px", color: "#fff", cursor: "pointer" }}
                onClick={() => setToggleUploadBtn(!toggleUploadBtn)}></i>
            <label style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "20px" }}>Upload a Photo</label>
            <input type="text" className="lb-textbox mt-1" placeholder="Enter title" name="title" value={newPost.title} onChange={handleInputChange} /><br />
            <input type="text" className="lb-textbox mt-1" placeholder="Same something to this photo..." name="description" value={newPost.description} onChange={handleInputChange} /><br />

            <input type="file" style={{ color: "#fff", padding: "5px" }} className="mt-1" onChange={onChangeHandler} /><br />
            <button type="button" style={{ margin: "10px 0px", width: "100%", fontSize: "1.2rem" }} onClick={(e) => onClickHandler(e)}>Upload</button>
        </div>
    )
}