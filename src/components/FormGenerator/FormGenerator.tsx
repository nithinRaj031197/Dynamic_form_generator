import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/formInputSlice";

import "./formGenerator.css";
import { startTransition } from "react";
import Modal from "../Modal/Modal";
import FormSection from "../FormSection/FormSection";

const FormGenerator = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal>
        <FormSection />
      </Modal>
    </>
  );
};

export default FormGenerator;
