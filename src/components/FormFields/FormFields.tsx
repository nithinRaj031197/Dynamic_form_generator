import { FormInitialInput } from "../../global";

import "./formFields.css";
type Props = {
  formFields: FormInitialInput[];
};

const FormFields = ({ formFields }: Props) => {
  const handleEditField = (id: any) => {};
  return (
    <>
      <div className="form_fields_container">
        {formFields?.map((field: FormInitialInput) => {
          return (
            <div key={field.question}>
              {field.select_input_type === "text_input" && (
                <div className="input form_text_input">
                  <label className="form_field_label">
                    {field.question}
                    <span
                      onClick={() => handleEditField(field.id)}
                      style={{ fontSize: "14px", cursor: "pointer", float: "right" }}
                    >
                      <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                    </span>
                  </label>
                  <input type="text" placeholder="Your Answer" />
                </div>
              )}
              {field.select_input_type === "text_area" && (
                <div className="input form_text_area">
                  <label className="form_field_label">
                    {field.question}
                    <span
                      onClick={() => handleEditField(field.id)}
                      style={{ fontSize: "14px", cursor: "pointer", float: "right" }}
                    >
                      <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                    </span>
                  </label>
                  <textarea rows={1} placeholder="Your Answer"></textarea>
                </div>
              )}
              {field.select_input_type === "dropdown" && (
                <div className="input form_dropdown">
                  <label className="form_field_label">
                    {field.question}
                    <span
                      onClick={() => handleEditField(field.id)}
                      style={{ fontSize: "14px", cursor: "pointer", float: "right" }}
                    >
                      <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                    </span>
                  </label>
                  <select id="select_input" className="form_select_input">
                    {field?.options?.map((option: string) => {
                      return (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
              {field.select_input_type === "checkbox" && (
                <div className="input form_checkbox">
                  <p>
                    {field.question}
                    <span
                      onClick={() => handleEditField(field.id)}
                      style={{ fontSize: "14px", cursor: "pointer", float: "right" }}
                    >
                      <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                    </span>
                  </p>
                  {field?.options?.map((option: string) => {
                    return (
                      <div className="checkbox_container" key={option}>
                        <label className="checkbox_label">
                          <input type="checkbox" />
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
              {field.select_input_type === "radio" && (
                <div className="input form_radio">
                  <p>
                    {field.question}
                    <span
                      onClick={() => handleEditField(field.id)}
                      style={{ fontSize: "14px", cursor: "pointer", float: "right" }}
                    >
                      <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                    </span>
                  </p>
                  {field?.options?.map((option: string) => {
                    return (
                      <div className="radio_container" key={option}>
                        <label key={option} className="radio_label">
                          <input type="radio" />
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FormFields;
