import React, { useState } from 'react';
import axios from 'axios';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Gallery = React.lazy(() => import('./../../components/Gallery/Gallery'));

const DefaultLayout = () => {
    const [selectedFile, setSelectFile] = useState(null);

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
        <React.Fragment>
            <DefaultHeader/>
            
            <div className="content">
                <section className="home">
                    <div className="tagline"></div>
                    <div className="ladbrokes"></div>
                </section>

                <section className="gallery-wrapper">
                    <Gallery/>

                    <input type="file" onChange={onChangeHandler} />
                    <button type="button" onClick={onClickHandler}>upload</button>
                </section>
            </div>
        </React.Fragment>
    )
}

export default DefaultLayout;