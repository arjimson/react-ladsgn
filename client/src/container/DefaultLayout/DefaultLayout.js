import React, { Component } from 'react';
import axios from 'axios';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Gallery = React.lazy(() => import('./../../components/Gallery/Gallery'));
const Modal = React.lazy(() => import('../../components/Modal/Modal'));

const DefaultLayout = () => {

    const photos = [
        {
            img: require('../../assets/img/img-1.png')
        },
        {
            img: require('../../assets/img/img-2.png')
        },
        {
            img: require('../../assets/img/img-3.png')
        },
        {
            img: require('../../assets/img/img-4.png')
        },
        {
            img: require('../../assets/img/img-5.png')
        },
        {
            img: require('../../assets/img/img-6.png')
        },
        {
            img: require('../../assets/img/img-7.png')
        },
        {
            img: require('../../assets/img/img-8.png')
        }
    ]

    return (
        <React.Fragment>
            <DefaultHeader/>
            
            <div className="content">
                <section className="home">
                    <div className="tagline"></div>
                    <div className="ladbrokes"></div>
                </section>

                <section className="gallery-wrapper">
                    <Gallery
                        photos={photos}
                        columns={4}
                    />
                </section>
            </div>
        </React.Fragment>
    )
}

export default DefaultLayout;