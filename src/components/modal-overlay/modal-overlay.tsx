import React, {FC} from 'react';
import modalOverlayStyle from './modal-overlay.module.css';

interface IModalOverlay {
  closeModal: () => void;
}

const ModalOverlay:FC<IModalOverlay> = ({closeModal}) => {
  return (
    <div onClick={closeModal} className={modalOverlayStyle.overlay}/>
  )
}

export default ModalOverlay
