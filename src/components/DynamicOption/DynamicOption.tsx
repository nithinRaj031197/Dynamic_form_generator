// import React, { useId, useState } from "react";
// import "./dynamicOption.css";

// type IDynamicOptionProps = {
//   options: any;
//   formInputValue: any;
//   setFormInputValue: any;
// };

// function DynamicOption({ options, formInputValue, setFormInputValue }: IDynamicOptionProps) {
//   // State to manage the list of options

//   const [newOption, setNewOption] = useState<any>("");

//   // Function to add a new option to the list
//   const addOption = () => {
//     if (newOption.trim() !== "") {
//       setFormInputValue({ ...formInputValue, options: [...options, newOption] });
//       setNewOption("");
//     }
//   };

//   // Function to edit an existing option
//   const editOption = (index: any, newValue: any) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = newValue;
//     setFormInputValue({ ...formInputValue, options: updatedOptions });
//   };

//   // Function to delete an option
//   const deleteOption = (index: any) => {
//     const updatedOptions = [...options];
//     updatedOptions.splice(index, 1);
//     setFormInputValue({ ...formInputValue, options: updatedOptions });
//   };

//   return (
//     <div className="dynamic_option_container">
//       <ul>
//         {options.map((option: any, index: any) => (
//           <li className="options" key={index}>
//             <p>{`${index + 1}. ${option}`}</p>
//             <div className="mutate_option_container">
//               <button
//                 type="button"
//                 className="option_edit_btn"
//                 onClick={() => editOption(index, prompt("Edit option:", option))}
//               >
//                 <i className="fa-sharp fa-solid fa-pen-to-square"></i>
//               </button>
//               <button type="button" className="option_delete_btn" onClick={() => deleteOption(index)}>
//                 <i className="fa-sharp fa-solid fa-trash"></i>
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="option_add_container">
//         <input
//           className="option_input"
//           type="text"
//           value={newOption}
//           onChange={(e) => setNewOption(e.target.value)}
//           placeholder="Add a new option"
//         />
//         <button className="option_add_btn" type="button" onClick={addOption}>
//           <i className="fa-sharp fa-solid fa-plus"></i>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DynamicOption;

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
