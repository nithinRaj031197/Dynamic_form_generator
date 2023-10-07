import { useState } from "react";
import "./dynamicOption.css";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { addOptions, updateOptions } from "../../redux/formInputSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function DynamicOption() {
  const [newOption, setNewOption] = useState("");
  const [editNewOption, setEditNewOption] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const dispatch = useDispatch();

  const options = useSelector((state: RootState) => state.formInput.formInput.options) ?? [];

  const addOption = () => {
    if (newOption.trim() !== "") {
      dispatch(addOptions(newOption));
      setNewOption("");
    }
  };

  const startEditOption = (index: number) => {
    setIsEditing(true);
    setEditingIndex(index);
    setEditNewOption(options[index]);
  };

  const cancelEditOption = () => {
    setEditingIndex(-1);
    setIsEditing(false);
    setNewOption("");
  };

  const saveEditedOption = () => {
    if (editNewOption.trim() !== "") {
      const updatedOptions = [...options];
      updatedOptions[editingIndex] = editNewOption;
      dispatch(updateOptions(updatedOptions));
      setEditingIndex(-1);
      setIsEditing(false);
      setEditNewOption("");
    }
  };

  const deleteOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    dispatch(updateOptions(updatedOptions));
  };

  return (
    <div className="dynamic_option_container">
      <ul>
        {options.map((option: any, index: any) => (
          <li className="options" key={index}>
            {editingIndex === index ? (
              <div className="edit-option-container">
                <input
                  className="option_input"
                  type="text"
                  value={editNewOption}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveEditedOption();
                    }
                  }}
                  onChange={(e) => setEditNewOption(e.target.value)}
                />
                <Button className="option_save_btn" onClick={saveEditedOption}>
                  Save
                </Button>
                <Button className="option_cancel_btn" onClick={cancelEditOption}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <p style={{ color: "black" }}>{`${index + 1}. ${option}`}</p>
                <div className="mutate_option_container">
                  <button type="button" className="option_edit_btn" onClick={() => startEditOption(index)}>
                    <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                  </button>
                  <button type="button" className="option_delete_btn" onClick={() => deleteOption(index)}>
                    <i className="fa-sharp fa-solid fa-trash"></i>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {!isEditing && (
        <div className="option_add_container">
          <input
            className="option_input"
            type="text"
            value={newOption}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addOption();
              }
            }}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Add a new option"
          />
          <button className="option_add_btn" type="button" onClick={addOption}>
            <i className="fa-sharp fa-solid fa-plus"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default DynamicOption;
