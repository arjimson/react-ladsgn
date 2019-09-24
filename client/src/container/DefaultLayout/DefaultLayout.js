import React, { Component } from 'react';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Gallery = React.lazy(() => import('./../../components/Gallery/Gallery'));
const Modal = React.lazy(() => import('../../components/Modal/Modal'));

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
                    <h1>Bero</h1>
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

                        <Modal
                            showModal={showModal}
                            handleCloseModal={this.handleCloseModal}
                        />
                    </section>
                </div>
            </>
        )
    }
}

export default DefaultLayout;