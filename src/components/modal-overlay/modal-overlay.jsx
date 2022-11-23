import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';

const ModalOverlay = ({closeModal}) => {
  return (
    <div onClick={closeModal} className={modalOverlayStyle.overlay}/>
  )
}

export default ModalOverlay
