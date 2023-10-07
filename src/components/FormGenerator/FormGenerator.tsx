import React, { BaseSyntheticEvent, useState } from "react";
import Modal from "../Modal/Modal";
import "./formGenerator.css";
import DynamicOption from "../DynamicOption/DynamicOption";
import { FormInitialInput } from "../../global";

type Props = {
  formFields: FormInitialInput[];
  setFormFields: React.Dispatch<React.SetStateAction<FormInitialInput[]>>;
};

const FormGenerator = ({ formFields, setFormFields }: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [formInputValue, setFormInputValue] = useState<FormInitialInput>({
    question: "",
    select_input_type: "text_input",
    options: [],
    id: new Date().getTime(),
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleQuestion = (e: BaseSyntheticEvent) => {
    setFormInputValue({ ...formInputValue, [e.target.name]: e.target.value });
  };

  const handleSelectInput = (e: BaseSyntheticEvent) => {
    setFormInputValue({ ...formInputValue, [e.target.name]: e.target.value });
  };

  const handleSaveFields = () => {
    setFormFields([...formFields, formInputValue]);
    setModalOpen(false);
    setFormInputValue({
      question: "",
      select_input_type: "text_input",
      options: [],
      id: new Date().getTime(),
    });
  };

  return (
    <>
      <button className="add_field_btn" onClick={openModal}>
        ADD FIELD
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <form className="form_generator_container" onSubmit={(e) => e.preventDefault()}>
          <div className="form_top_section">
            <div className="question_container">
              <label htmlFor="question">Question:</label>
              <input
                type="text"
                id="question"
                name="question"
                placeholder="Enter Question..."
                onChange={handleQuestion}
                value={formInputValue.question}
              />
            </div>
            <div className="select_input_container">
              <label htmlFor="select_input">Select Input Type:</label>
              <select
                id="select_input"
                className="select_input"
                name="select_input_type"
                onChange={handleSelectInput}
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
                <DynamicOption
                  options={formInputValue.options}
                  formInputValue={formInputValue}
                  setFormInputValue={setFormInputValue}
                />
              </>
            )}
          </>
          <div className="save_btn_container">
            <button type="button" className="save_btn" onClick={handleSaveFields}>
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FormGenerator;
