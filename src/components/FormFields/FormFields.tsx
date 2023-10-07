import { useSelector } from "react-redux";
import { FormInitialInput } from "../../global";

import "./formFields.css";
import { RootState } from "../../redux/store";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { turnOnFieldUpdate, openModal, setFormInput } from "../../redux/formInputSlice";
import { removeFormField } from "../../redux/formFieldsSlice";

const FormFields: FC = () => {
  const formFields = useSelector((state: RootState) => state.formFields.formFields);

  const dispatch = useDispatch();

  const handleEditField = (id: number | undefined) => {
    if (id !== undefined) {
      const getFieldData = formFields?.find((field: FormInitialInput) => field.id === id);
      if (getFieldData) {
        setTimeout(() => {
          dispatch(setFormInput(getFieldData));
          dispatch(openModal());
          dispatch(turnOnFieldUpdate());
        }, 0);
      }
    }
  };

  return (
    <>
      <div className="form_fields_container">
        {formFields?.map((field: FormInitialInput, index: number) => {
          return (
            <div key={field.question}>
              {field.select_input_type === "text_input" && (
                <div className="input form_text_input">
                  <label className="form_field_label">{field.question}</label>
                  <input type="text" placeholder="Your Answer" />
                  <div
                    style={{ position: "absolute", display: "flex", flexDirection: "row", gap: 5, right: 5, top: 5 }}
                  >
                    <UpdateField onClick={() => handleEditField(field?.id)} />
                    <DeleteField onClick={() => dispatch(removeFormField(index))} />
                  </div>
                </div>
              )}
              {field.select_input_type === "text_area" && (
                <div className="input form_text_area">
                  <label className="form_field_label">{field.question}</label>
                  <textarea rows={1} placeholder="Your Answer"></textarea>
                  <div
                    style={{ position: "absolute", display: "flex", flexDirection: "row", gap: 5, right: 5, top: 5 }}
                  >
                    <UpdateField onClick={() => handleEditField(field.id)} />
                    <DeleteField onClick={() => dispatch(removeFormField(index))} />
                  </div>
                </div>
              )}
              {field.select_input_type === "dropdown" && (
                <div className="input form_dropdown">
                  <label className="form_field_label">{field.question}</label>
                  <select id="select_input" className="form_select_input">
                    {field?.options?.map((option: string) => {
                      return (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                  <div
                    style={{ position: "absolute", display: "flex", flexDirection: "row", gap: 5, right: 5, top: 5 }}
                  >
                    <UpdateField onClick={() => handleEditField(field.id)} />
                    <DeleteField onClick={() => dispatch(removeFormField(index))} />
                  </div>
                </div>
              )}
              {field.select_input_type === "checkbox" && (
                <div className="input form_checkbox">
                  <p>{field.question}</p>
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
                  <div
                    style={{ position: "absolute", display: "flex", flexDirection: "row", gap: 5, right: 5, top: 5 }}
                  >
                    <UpdateField onClick={() => handleEditField(field.id)} />
                    <DeleteField onClick={() => dispatch(removeFormField(index))} />
                  </div>
                </div>
              )}
              {field.select_input_type === "radio" && (
                <div className="input form_radio">
                  <p>{field.question}</p>
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
                  <div
                    style={{ position: "absolute", display: "flex", flexDirection: "row", gap: 5, right: 5, top: 5 }}
                  >
                    <UpdateField onClick={() => handleEditField(field.id)} />
                    <DeleteField onClick={() => dispatch(removeFormField(index))} />
                  </div>
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

const DeleteField = ({ onClick }: any) => {
  return (
    <div>
      <button type="button" onClick={() => onClick()} className="option_delete_btn" style={{ float: "right" }}>
        <i className="fa-sharp fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

const UpdateField = ({ onClick }: any) => {
  return (
    <button type="button" className="option_edit_btn" onClick={() => onClick()}>
      <i className="fa-sharp fa-solid fa-pen-to-square"></i>
    </button>
  );
};
