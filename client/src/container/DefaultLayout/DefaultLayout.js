import React, { Component } from 'react';
import axios from 'axios';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Gallery = React.lazy(() => import('./../../components/Gallery/Gallery'));
const Modal = React.lazy(() => import('../../components/Modal/Modal'));

class DefaultLayout extends Component {

    state = {
        multerImage: ''
    }

    uploadImage = (e) => {
        let imageFormObj = new FormData();

        imageFormObj.append('imageData', e.target.files[0]);
        imageFormObj.append('imageName', 'multer-image' + Date.now());

        this.setState({
            multerImage: URL.createObjectURL(e.target.files[0])
        })

        axios.post('http://localhost:5000/api/posts/uploadmulter', imageFormObj)
        .then(response => {
            console.log(imageFormObj)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
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
    
                        <input type="file" onChange={(e) => this.uploadImage(e)} />
                    </section>
                </div>
            </React.Fragment>
        )
    }

}

export default DefaultLayout;