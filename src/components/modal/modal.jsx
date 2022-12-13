import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modals");

const Modal = ({title, children, closeModal}) => {

  useEffect(() => {
    const pressEsc = (evt) => {
      evt.key === "Escape" && closeModal();
    };
    document.addEventListener("keydown", pressEsc);
    return () => {
      document.removeEventListener("keydown", pressEsc);
    };
    }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.wrapper}>
        <ModalOverlay closeModal={closeModal}/>
        <div className={modalStyles.container}>
          <div className={modalStyles.close} onClick={closeModal}>
            <CloseIcon className type="primary"/>
          </div>
          {title && <h3 className={`text_type_main-large ${modalStyles.title}`}>{title}</h3>}
          {children}
        </div>
      </div>
    </>, modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal
