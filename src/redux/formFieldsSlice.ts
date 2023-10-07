import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormInitialInput } from "../global";

interface FormFieldsState {
  formFields: FormInitialInput[];
}

const initialState: FormFieldsState = {
  formFields: [
    {
      question: "dasda",
      select_input_type: "text_input",
      options: [],
      id: 1696616725551,
    },
    {
      question: "sadsad",
      select_input_type: "text_area",
      options: [],
      id: 1696616729223,
    },
    {
      question: "Drop",
      select_input_type: "dropdown",
      options: ["ssd", "ssadda"],
      id: 1696617386489,
    },
    {
      question: "Checkbox",
      select_input_type: "checkbox",
      options: ["ssd", "ssadda"],
      id: 1696617386490,
    },
    {
      question: "Radio",
      select_input_type: "radio",
      options: ["ssd", "ssadda"],
      id: 1696617386491,
    },
  ],
};

const formFieldsSlice = createSlice({
  name: "formFields",
  initialState,
  reducers: {
    addFormField: (state, action: PayloadAction<FormInitialInput>) => {
      state.formFields.push(action.payload);
    },
    removeFormField: (state, action: PayloadAction<number>) => {
      state.formFields.splice(action.payload, 1);
    },
    updateFormField: (state, action: PayloadAction<{ index: number; field: FormInitialInput }>) => {
      state.formFields[action.payload.index] = action.payload.field;
    },
  },
});

export const { addFormField, removeFormField, updateFormField } = formFieldsSlice.actions;

export default formFieldsSlice.reducer;
