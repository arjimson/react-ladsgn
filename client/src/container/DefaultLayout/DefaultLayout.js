import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Gallery = React.lazy(() => import('./../../components/Gallery/Gallery'));

const DefaultLayout = () => {
    const [selectedFile, setSelectFile] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
        .then(res => {
            setPosts(res.data)
        })

        console.log(selectedFile);
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

    return (
        <>
            <DefaultHeader/>
            
            <div className="content">
                <section className="home">
                    <div className="tagline"></div>
                    <div className="ladbrokes"></div>
                </section>

                <section className="gallery-wrapper">
                    <Gallery posts={posts}/>

                    <input type="file" onChange={onChangeHandler} />
                    <button type="button" onClick={onClickHandler}>upload</button>
                </section>
            </div>
        </>
    )
}

export default DefaultLayout;