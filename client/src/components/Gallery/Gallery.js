import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import './Gallery.scss';

const Gallery = ({ posts, highlightArtworkHandler, fetchImagesHandler }) => {
    const columns = 4;
    const columnWrapper = {};
    const result = [];
    
    for (let i = 0; i < columns; i++ ) {
        columnWrapper[`column${i}`] = [];
    }

    for (let i = 0; i < posts.length; i++) {
        const columnIndex = i % columns;
        columnWrapper[`column${columnIndex}`].push(
            <a href="#" key={i} onClick={(_id) => highlightArtworkHandler(posts[i]._id)}>
                <img src={require("../../assets/uploads/" + posts[i].image_path)} />
            </a>
        )
    }

    for (let i = 0; i < columns; i++) {
        result.push(
            <div className="gallery__item" key={i}>
                {columnWrapper[`column${i}`]}
            </div>
        )
    }

    return (
        <>
            <div className="gallery">
            {result}
                {/* <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchImagesHandler}
                    hasMore={true}
                    loader={''}
                >
                    
                </InfiniteScroll> */}
            </div>
        </>
    )

}

export default Gallery;