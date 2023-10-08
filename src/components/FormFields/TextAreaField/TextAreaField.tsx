import { FormInitialInput } from "../../../global";
import "./textAreaField.css";

interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  field: FormInitialInput;
  index: number;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, newIndex: number) => void;
  children: React.ReactNode;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder,
  field,
  index,
  handleDragStart,
  handleDragOver,
  handleDrop,
  children,
}) => {
  return (
    <div
      className="input form_text_area"
      key={field.id}
      draggable
      onDragStart={(e) => handleDragStart(e, field.id as string)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
      <i style={{ position: "absolute", top: "5px", left: "50%", cursor: "grab" }} className="fa-solid fa-grip"></i>
      <label className="form_field_label">{label}</label>
      <textarea rows={1} placeholder={placeholder}></textarea>
      {children}
    </div>
  );
};

export default TextAreaField;
