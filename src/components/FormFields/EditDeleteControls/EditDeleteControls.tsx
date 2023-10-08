import React from "react";
import "./editDeletControls.css";

type EditDeleteControlProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const EditDeleteControls: React.FC<EditDeleteControlProps> = ({ onEdit, onDelete }) => {
  return (
    <div style={{ position: "absolute", display: "flex", flexDirection: "row", gap: 5, right: 5, top: 5 }}>
      <UpdateField onClick={onEdit} />
      <DeleteField onClick={onDelete} />
    </div>
  );
};

export default EditDeleteControls;

const DeleteField = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button type="button" onClick={() => onClick()} className="option_delete_btn" style={{ float: "right" }}>
        <i className="fa-sharp fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

const UpdateField = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" className="option_edit_btn" onClick={() => onClick()}>
      <i className="fa-sharp fa-solid fa-pen-to-square"></i>
    </button>
  );
};
