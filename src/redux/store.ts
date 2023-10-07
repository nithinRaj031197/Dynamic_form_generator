import { configureStore } from "@reduxjs/toolkit";
import formFieldsReducer from "./formFieldsSlice";
import formInputReducer from "./formInputSlice";

const store = configureStore({
  reducer: {
    formFields: formFieldsReducer,
    formInput: formInputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
