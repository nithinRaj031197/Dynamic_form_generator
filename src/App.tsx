import { useState } from "react";
import "./App.css";
import FormGenerator from "./components/FormGenerator/FormGenerator";
import { FormInitialInput } from "./global";
import FormFields from "./components/FormFields/FormFields";

function App() {
  const [formFields, setFormFields] = useState<FormInitialInput[]>([
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
  ]);
  console.log(formFields);
  return (
    <>
      <div className="main__container">
        <div className="top_rack">
          <h1>Dynamic Form Generator</h1>

          <FormGenerator formFields={formFields} setFormFields={setFormFields} />
        </div>
        {/* <div style={{ borderBottom: "1px solid #000", margin: "0px 20px" }}></div> */}
      </div>
      <FormFields formFields={formFields} />
    </>
  );
}

export default App;
