import React, {useEffect, FC} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modals")!;

interface IModal {
  title?: string | number;
  children: any;
  closeModal: () => void;
}

const Modal:FC<IModal> = ({title, children, closeModal}) => {

  useEffect(() => {
    const pressEsc = (evt: KeyboardEvent) => {
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
            <CloseIcon type="primary"/>
          </div>
          {title && <h3 className={`text_type_main-large ${modalStyles.title}`}>{title}</h3>}
          {children}
        </div>
      </div>
    </>, modalRoot
  );
}

export default Modal
