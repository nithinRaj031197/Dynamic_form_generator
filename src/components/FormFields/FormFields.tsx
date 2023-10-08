import { useSelector } from "react-redux";
import { FormInitialInput } from "../../global";

import "./formFields.css";
import { RootState } from "../../redux/store";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { turnOnFieldUpdate, openModal, setFormInput } from "../../redux/formInputSlice";
import { removeFormField, reorderFormFields } from "../../redux/formFieldsSlice";
import TextInputField from "./TextInputField/TextInputField";
import TextAreaField from "./TextAreaField/TextAreaField";
import DropDownField from "./DropDownField/DropDownField";
import CheckboxField from "./CheckboxField/CheckboxField";
import RadioField from "./RadioField/RadioField";
import EditDeleteControls from "./EditDeleteControls/EditDeleteControls";

const FormFields: FC = () => {
  const formFields = useSelector((state: RootState) => state.formFields.formFields);

  const dispatch = useDispatch();

  const handleEditField = (id: string | undefined) => {
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newIndex: number) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData("text/plain");

    const draggedItemIndex = formFields.findIndex((item) => item.id === itemId);

    if (draggedItemIndex !== -1) {
      dispatch(reorderFormFields({ startIndex: draggedItemIndex, endIndex: newIndex }));
    }
  };

  return (
    <>
      <div className="form_fields_container">
        {formFields?.map((field: FormInitialInput, index: number) => {
          return (
            <div key={field.question}>
              {field.select_input_type === "text_input" && (
                <>
                  <TextInputField
                    field={field}
                    label={field.question}
                    handleDragOver={handleDragOver}
                    handleDragStart={handleDragStart}
                    handleDrop={handleDrop}
                    index={index}
                    placeholder="Your Answer"
                    key={field.id}
                  >
                    <EditDeleteControls
                      onEdit={() => handleEditField(field.id as string)}
                      onDelete={() => dispatch(removeFormField(index))}
                    />
                  </TextInputField>
                </>
              )}
              {field.select_input_type === "text_area" && (
                <TextAreaField
                  field={field}
                  label={field.question}
                  handleDragOver={handleDragOver}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  index={index}
                  placeholder="Your Answer"
                  key={field.id}
                >
                  <EditDeleteControls
                    onEdit={() => handleEditField(field.id as string)}
                    onDelete={() => dispatch(removeFormField(index))}
                  />
                </TextAreaField>
              )}
              {field.select_input_type === "dropdown" && (
                <DropDownField
                  field={field}
                  label={field.question}
                  handleDragOver={handleDragOver}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  index={index}
                  key={field.id}
                >
                  <EditDeleteControls
                    onEdit={() => handleEditField(field.id as string)}
                    onDelete={() => dispatch(removeFormField(index))}
                  />
                </DropDownField>
              )}
              {field.select_input_type === "checkbox" && (
                <CheckboxField
                  field={field}
                  label={field.question}
                  handleDragOver={handleDragOver}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  index={index}
                  key={field.id}
                >
                  <EditDeleteControls
                    onEdit={() => handleEditField(field.id as string)}
                    onDelete={() => dispatch(removeFormField(index))}
                  />
                </CheckboxField>
              )}
              {field.select_input_type === "radio" && (
                <RadioField
                  field={field}
                  label={field.question}
                  handleDragOver={handleDragOver}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  index={index}
                  key={field.id}
                >
                  <EditDeleteControls
                    onEdit={() => handleEditField(field.id as string)}
                    onDelete={() => dispatch(removeFormField(index))}
                  />
                </RadioField>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FormFields;
