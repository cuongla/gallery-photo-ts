import React, { FC } from 'react';
import ReactDOM from 'react-dom';

interface ImageModalProps {
    onClose: () => void;
    url: string
}

const ImageModal: FC<ImageModalProps> = ({ onClose, url }) => {
    const targetEl = document.getElementById('modal-root');

    const modal = (
        <div className="modal">
            <div 
                onClick={onClose}
                className="modal-background">
                    <div className="modal-content modal-content--image">
                        <img 
                            src={url}
                            alt="" 
                        />
                    </div>
            </div>
            <button 
                onClick={onClose}
                className="modal-close is-large"></button>
        </div>
    )

    return targetEl ? ReactDOM.createPortal(modal, targetEl) : modal;
}

export default ImageModal;