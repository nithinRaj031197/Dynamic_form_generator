import React from "react";
import "./checkboxField.css";
import { FormInitialInput } from "../../../global";

interface CheckboxFieldProps {
  label: string;
  field: FormInitialInput;
  index: number;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, newIndex: number) => void;
  children: React.ReactNode;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  field,
  index,
  handleDragStart,
  handleDragOver,
  handleDrop,
  children,
}) => {
  return (
    <div
      className="input form_checkbox"
      key={field.id}
      draggable
      onDragStart={(e) => handleDragStart(e, field.id as string)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
      <i className="fa-solid fa-grip drag_icon"></i>

      <p>{label}</p>
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

      {children}
    </div>
  );
};

export default CheckboxField;
