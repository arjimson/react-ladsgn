import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import { photos } from './../../photos';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
    render() {
        return (
            <>
                <DefaultHeader/>
                
                <div className="content">
                    <section className="home">
                        <div className="tagline"></div>
                        <div className="ladbrokes"></div>
                    </section>

                    <section classname="gallery">
                        <Gallery photos={photos} direction={"column"} columns="4" />
                    </section>
                </div>
            </>
        )
    }
}

export default DefaultLayout;