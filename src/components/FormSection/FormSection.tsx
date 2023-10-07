import React from "react";
import "./formSection.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { closeModal, resetFormInput, updateQuestion, updateSelectInputType } from "../../redux/formInputSlice";
import DynamicOption from "../DynamicOption/DynamicOption";
import Button from "../Button/Button";
import { addFormField } from "../../redux/formFieldsSlice";

const FormSection: React.FC = () => {
  const isFieldUpdate = useSelector((state: RootState) => state.formInput.isFieldUpdate);

  const formInputValue = useSelector((state: RootState) => state.formInput.formInput);

  const dispatch = useDispatch();

  console.log("isFieldUpdate", isFieldUpdate);
  return (
    <form className="form_generator_container" onSubmit={(e) => e.preventDefault()}>
      <div className="form_top_section">
        <div className="question_container">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            placeholder="Enter Question..."
            onChange={(e) => dispatch(updateQuestion(e.target.value))}
            value={formInputValue.question}
          />
        </div>
        <div className="select_input_container">
          <label htmlFor="select_input">Select Input Type:</label>
          <select
            id="select_input"
            className="select_input"
            name="select_input_type"
            onChange={(e) =>
              dispatch(
                updateSelectInputType(e.target.value as "text_input" | "text_area" | "dropdown" | "checkbox" | "radio")
              )
            }
            value={formInputValue.select_input_type}
          >
            <option value="text_input">Text Input</option>
            <option value="text_area">Text Area</option>
            <option value="dropdown">Drop Down</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
        </div>
      </div>
      <>
        {(formInputValue.select_input_type === "dropdown" ||
          formInputValue.select_input_type === "checkbox" ||
          formInputValue.select_input_type === "radio") && (
          <>
            <DynamicOption />
          </>
        )}
      </>
      <div className="save_btn_container">
        <Button
          type="button"
          className="save_btn"
          onClick={() => {
            dispatch(addFormField(formInputValue));
            dispatch(closeModal());
            dispatch(resetFormInput());
          }}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormSection;
