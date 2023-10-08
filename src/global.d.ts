export type FormInitialInput = {
  question: string;
  select_input_type: "text_input" | "text_area" | "dropdown" | "checkbox" | "radio";
  options?: Array<string>;
  id?: string;
};
