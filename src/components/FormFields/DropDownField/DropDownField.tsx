import { FormInitialInput } from "../../../global";
import "./dropDownField.css";

interface DropDownFieldProps {
  label: string;

  field: FormInitialInput;
  index: number;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, newIndex: number) => void;
  children: React.ReactNode;
}

const DropDownField: React.FC<DropDownFieldProps> = ({
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
      className="input form_dropdown"
      key={field.id}
      draggable
      onDragStart={(e) => handleDragStart(e, field.id as string)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
      <i className="fa-solid fa-grip drag_icon"></i>
      <label className="form_field_label">{label}</label>
      <select id="select_input" className="form_select_input">
        <option value="">Select an option</option>
        {field?.options?.map((option: string) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {children}
    </div>
  );
};

export default DropDownField;
