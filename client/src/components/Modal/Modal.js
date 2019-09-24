import React from 'react';
import ReactModal from 'react-modal';

import './Modal.scss';

ReactModal.defaultStyles.overlay.zIndex = '999';

const modal = props => {
    const { showModal, handleCloseModal} = props;
    return (
        <ReactModal 
           isOpen={showModal}
        >
          <button onClick={handleCloseModal}>Close Modal</button>
        </ReactModal>
    )
}

export default modal;