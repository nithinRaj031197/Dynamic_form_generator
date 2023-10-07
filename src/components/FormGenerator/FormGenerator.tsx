import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { closeModal, openModal, resetFormInput } from "../../redux/formInputSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./formGenerator.css";
import FormSection from "../FormSection/FormSection";

const FormGenerator = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        className="add_field_btn"
        onClick={() => {
          dispatch(openModal());
        }}
      >
        ADD FIELD
      </Button>
      <Modal>
        <FormSection />
      </Modal>
    </>
  );
};

export default FormGenerator;
