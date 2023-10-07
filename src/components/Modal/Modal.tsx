import { ReactNode } from "react";
import "./modal.css";

type IModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, closeModal, children }: IModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={closeModal} className="modal-close-button">
          &#x2716;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
