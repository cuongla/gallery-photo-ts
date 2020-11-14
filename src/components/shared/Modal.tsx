import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    onClose: () => void;
    title: string;
    children: ReactNode
}

const Modal: FC<ModalProps> = ({ onClose, title, children }) =>{
    const targetEl = document.getElementById('modal-root');

    const modal = (
        <div className="modal">
            <div 
                className="modal-background"
                onClick={onClose}
                >
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            <button 
                                className="delete"
                                aria-label="close"
                                onClick={onClose}
                            >
                                <section className="modal-card-body">
                                    {children}
                                </section>
                                <footer className="modal-card-foot">
                                    <button 
                                        className="button"
                                        onClick={onClose}
                                        >
                                            Cancel
                                    </button>
                                </footer>
                            </button>
                        </p>
                    </header>
                </div>
            </div>
        </div>
    ) 

    return targetEl ? ReactDOM.createPortal(modal, targetEl) : modal;
}

export default Modal;