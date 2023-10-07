import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormInitialInput } from "../global";

type SelectInputType = "text_input" | "text_area" | "dropdown" | "checkbox" | "radio";

interface IFormInputInitialState {
  formInput: FormInitialInput;
  modal: { isModalOpen: boolean };
  isFieldUpdate: boolean;
}
const initialState: IFormInputInitialState = {
  formInput: {
    question: "",
    select_input_type: "text_input" as SelectInputType,
    options: [],
  },
  modal: {
    isModalOpen: false,
  },
  isFieldUpdate: false,
};

const formInputSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    updateQuestion: (state, action: PayloadAction<string>) => {
      state.formInput = {
        ...state.formInput,
        question: action.payload,
      };
    },
    updateSelectInputType: (state, action: PayloadAction<SelectInputType>) => {
      state.formInput.select_input_type = action.payload;
    },
    addOptions: (state, action: PayloadAction<string>) => {
      state.formInput.options?.push(action.payload);
    },
    updateOptions: (state, action: PayloadAction<string[]>) => {
      state.formInput.options = action.payload;
    },
    resetFormInput: () => {
      return initialState;
    },
    setFormInput: (state, action: PayloadAction<FormInitialInput>) => {
      state.formInput = action.payload;
    },
    openModal: (state) => {
      state.modal.isModalOpen = true;
    },
    closeModal: (state) => {
      state.modal.isModalOpen = false;
    },
    turnOnFieldUpdate: (state) => {
      state.isFieldUpdate = true;
    },
    turnOffFieldUpdate: (state) => {
      state.isFieldUpdate = false;
    },
  },
});

export const {
  updateQuestion,
  updateSelectInputType,
  addOptions,
  updateOptions,
  resetFormInput,
  setFormInput,
  openModal,
  closeModal,
  turnOnFieldUpdate,
  turnOffFieldUpdate,
} = formInputSlice.actions;

export default formInputSlice.reducer;
