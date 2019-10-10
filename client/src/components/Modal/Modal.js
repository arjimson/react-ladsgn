import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = event => {
          // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }
    
        handler(event);
        };
    
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
    
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, []);
}

const modalBackgroundPoses = {
    open: {
        background: 'rgba(247, 247, 247, 0.9)',
        applyAtStart: {
            display: 'block'
        }
    },
    closed: {
        background: 'rgba(0, 0, 0, 0)',
        applyAtStart: {
            display: 'none'
        }
    }
}

const ModalBackground = styled(posed.div(modalBackgroundPoses))`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const modalPoses = {
    open: {
        opacity: 1,
        transition: {
            opacity: {
                type: "tween",
                duration: 200
            }
        }
    },
    closed: {
        opacity: 0,
        transition: {
            opacity: {
                type: "tween",
                duration: 200
            }
        }
    }
};
  
const ModalBody = styled(posed.div(modalPoses))`
`;

const Modal = ({ isOpen, toggle, children }) => {
    const ref = useRef();
  
    useOnClickOutside(ref, () => toggle(false));
  
    return (
        <ModalBackground initialPose="closed" pose={isOpen ? "open" : "closed"}>
            <ModalBody ref={ref}>{children}</ModalBody>
        </ModalBackground>
    );
}

export default Modal;