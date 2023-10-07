import { ReactNode } from "react";
import "./modal.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { closeModal, resetFormInput, turnOffFieldUpdate } from "../../redux/formInputSlice";

type IModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: IModalProps) => {
  const { isModalOpen } = useSelector((state: RootState) => state.formInput.modal);

  const isFieldUpdate = useSelector((state: RootState) => state.formInput.isFieldUpdate);

  const dispatch = useDispatch();

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          tabIndex={4}
          onClick={() => {
            if (isFieldUpdate) {
              dispatch(turnOffFieldUpdate());
            }
            dispatch(closeModal());
            dispatch(resetFormInput());
          }}
          className="modal-close-button"
        >
          <span className="visually-hidden">Close Modal</span>
          &#x2716;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
