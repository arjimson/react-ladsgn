import React, { Component } from 'react';
import axios from 'axios';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Gallery = React.lazy(() => import('./../../components/Gallery/Gallery'));
const Modal = React.lazy(() => import('../../components/Modal/Modal'));

class DefaultLayout extends Component {

    state = {
        selectedFile: null
    }

    onChangeHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    onClickHandler = e => {
        const data = new FormData();
        data.append('file', this.state.selectedFile);

        axios.post('http://localhost:5000/api/posts/', data)
        .then(response => {
            console.log(response)
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
    
                        <input type="file" onChange={this.onChangeHandler} />
                        <button type="button" onClick={this.onClickHandler}>upload</button>
                    </section>
                </div>
            </React.Fragment>
        )
    }

}

export default DefaultLayout;