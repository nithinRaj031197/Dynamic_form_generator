import React from "react";
import { FormInitialInput } from "../../../global";
import "./radioField.css";

interface RadioFieldProps {
  label: string;
  field: FormInitialInput;
  index: number;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, newIndex: number) => void;
  children: React.ReactNode;
}

const RadioField: React.FC<RadioFieldProps> = ({
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
      className="input form_radio"
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
          <div className="radio_container" key={option}>
            <label key={option} className="radio_label">
              <input type="radio" />
              {option}
            </label>
          </div>
        );
      })}
      {children}
    </div>
  );
};

export default RadioField;
