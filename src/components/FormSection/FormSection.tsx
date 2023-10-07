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
    } else {
      dispatch(addFormField({ ...data, ...formInputValue, id: new Date().getTime(), options: formInputValue.options }));
    }
    dispatch(closeModal());
    dispatch(resetFormInput());
    toast.success("Successfully added the field!", {});
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
                onChange={(e) => {
                  field.onChange(e);
                  dispatch(updateQuestion(e.target.value));
                }}
              />
            )}
          />
          <p style={{ color: "red" }}>{errors.question?.message}</p>
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
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  dispatch(
                    updateSelectInputType(
                      e.target.value as "text_input" | "text_area" | "dropdown" | "checkbox" | "radio"
                    )
                  );
                }}
              >
                <option value="text_input">Text Input</option>
                <option value="text_area">Text Area</option>
                <option value="dropdown">Drop Down</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
              </select>
            )}
          />
          <p style={{ color: "red" }}>{errors.select_input_type?.message}</p>
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
        <Button type="submit" className="save_btn">
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormSection;
