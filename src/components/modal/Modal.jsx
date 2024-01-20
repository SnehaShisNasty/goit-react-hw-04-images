import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Close, ModalCss, Overlay, ImgCss, Button } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ modal, close }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, []);

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalCss>
        <Button type="button">
          <Close onClick={close}>X</Close>
        </Button>
        <ImgCss src={modal.modalImg} alt="" />
      </ModalCss>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
