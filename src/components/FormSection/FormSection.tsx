import React from "react";
import "./formSection.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  closeModal,
  resetFormInput,
  turnOffFieldUpdate,
  updateQuestion,
  updateSelectInputType,
} from "../../redux/formInputSlice";
import DynamicOption from "../DynamicOption/DynamicOption";
import Button from "../Button/Button";
import { addFormField, updateFormField } from "../../redux/formFieldsSlice";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInitialInput } from "../../global";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  question: yup.string().required("Question is required"),
  select_input_type: yup
    .string()
    .oneOf(["text_input", "text_area", "dropdown", "checkbox", "radio"], "Invalid input type")
    .required("Select Input Type is required"),
});

const FormSection: React.FC = () => {
  const formInputValue = useSelector((state: RootState) => state.formInput.formInput);

  const isFieldUpdate = useSelector((state: RootState) => state.formInput.isFieldUpdate);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInitialInput) => {
    if (
      data.select_input_type === "checkbox" ||
      data.select_input_type === "dropdown" ||
      data.select_input_type === "radio"
    ) {
      if (!("options" in formInputValue) || (formInputValue.options && formInputValue.options.length < 2)) {
        toast.error("Provide at least two options!", {});
        return;
      }
    }

    if (isFieldUpdate) {
      dispatch(updateFormField({ ...data, ...formInputValue, options: formInputValue.options }));
      dispatch(turnOffFieldUpdate());
      toast.success("Successfully edited the field!", {});
    } else {
      dispatch(addFormField({ ...data, ...formInputValue, id: uuidv4(), options: formInputValue.options }));
      toast.success("Successfully added the field!", {});
    }
    dispatch(closeModal());
    dispatch(resetFormInput());
  };

  return (
    <form className="form_generator_container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form_top_section">
        <div className="question_container">
          <label htmlFor="question">Question:</label>
          <Controller
            name="question"
            control={control}
            defaultValue={formInputValue.question}
            render={({ field }) => (
              <input
                type="text"
                id="question"
                placeholder="Enter Question..."
                autoFocus
                {...field}
                aria-labelledby="question-label"
                aria-invalid={!!errors.question}
                aria-describedby={errors.question ? "question-error" : undefined}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  field.onChange(e);
                  dispatch(updateQuestion(e.target.value));
                }}
                tabIndex={1}
              />
            )}
          />
          <p id="question-error" style={{ color: "red" }}>
            {errors.question?.message}
          </p>
        </div>
        <div className="select_input_container">
          <label htmlFor="select_input">Select Input Type:</label>
          <Controller
            name="select_input_type"
            control={control}
            defaultValue={formInputValue.select_input_type}
            render={({ field }) => (
              <select
                id="select_input"
                className="select_input"
                aria-labelledby="select-input-label"
                {...field}
                aria-invalid={!!errors.select_input_type}
                aria-describedby={errors.select_input_type ? "select-input-error" : undefined}
                onChange={(e) => {
                  field.onChange(e);
                  dispatch(
                    updateSelectInputType(
                      e.target.value as "text_input" | "text_area" | "dropdown" | "checkbox" | "radio"
                    )
                  );
                }}
                tabIndex={2}
              >
                <option value="text_input">Text Input</option>
                <option value="text_area">Text Area</option>
                <option value="dropdown">Drop Down</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
              </select>
            )}
          />
          <p id="select-input-error" style={{ color: "red" }}>
            {errors.select_input_type?.message}
          </p>
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
        <Button tabIndex={3} type="submit" className="save_btn" aria-labelledby="save-button-label">
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormSection;
