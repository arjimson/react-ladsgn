import React, { Component } from 'react';
import ReactModal from 'react-modal';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const Gallery = React.lazy(() => import('./../../components/Gallery/Gallery'));

class DefaultLayout extends Component {

    state = {
        showModal: false
    }

    handleOpenModal = () => {
        console.log('haha')
        this.setState({ showModal: true })
    }

    handleCloseModal = () => {
        this.setState({ showModal: false })
    }

    render() {

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

        const { showModal } = this.state;

        return (
            <>
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
                            handleOpenModal={this.handleOpenModal}
                        />

                        <ReactModal 
                            isOpen={showModal}
                            contentLabel="Minimal Modal Example"
                        />
                    </section>
                </div>
            </>
        )
    }
}

export default DefaultLayout;