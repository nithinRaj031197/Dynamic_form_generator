import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormInitialInput } from "../global";

interface FormFieldsState {
  formFields: FormInitialInput[];
}

const initialState: FormFieldsState = {
  formFields: JSON.parse(localStorage.getItem("formFields") ?? "[]"),
};

const formFieldsSlice = createSlice({
  name: "formFields",
  initialState,
  reducers: {
    addFormField: (state, action: PayloadAction<FormInitialInput>) => {
      state.formFields.push(action.payload);
      localStorage.setItem("formFields", JSON.stringify(state.formFields));
    },
    removeFormField: (state, action: PayloadAction<number>) => {
      state.formFields.splice(action.payload, 1);
      localStorage.setItem("formFields", JSON.stringify(state.formFields));
    },
    updateFormField: (state, action: PayloadAction<FormInitialInput>) => {
      const index = state.formFields.findIndex((field) => field.id === action.payload.id);
      console.log(index);
      if (index !== -1) {
        state.formFields[index] = action.payload;
        localStorage.setItem("formFields", JSON.stringify(state.formFields));
      }
    },
    reorderFormFields: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const [movedField] = state.formFields.splice(startIndex, 1);
      state.formFields.splice(endIndex, 0, movedField);
      localStorage.setItem("formFields", JSON.stringify(state.formFields));
    },
  },
});

export const { addFormField, removeFormField, updateFormField, reorderFormFields } = formFieldsSlice.actions;

export default formFieldsSlice.reducer;
