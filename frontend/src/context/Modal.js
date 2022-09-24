import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">

                <div id="top-of-modal">
                    <div id="modal-x" onClick={onClose}>x</div>
                    <div id="login">Log in</div>
                    <div id="blank"></div>
                </div>

                <div id="modal-welcome">Welcome to GareBnB</div>

                <div id="modal-log">
                    <div>
                    {children}
                    </div>
                </div>
            </div>
        </div>,
        modalNode
    );
}
