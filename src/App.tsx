import "./App.css";
import FormFields from "./components/FormFields/FormFields";
import { useSelector } from "react-redux";
import FormGenerator from "./components/FormGenerator/FormGenerator";
import { RootState } from "./redux/store";

function App() {
  const d = useSelector((state: RootState) => state.formFields.formFields);
  console.log("d", d);

  return (
    <>
      <div className="main__container">
        <div className="top_rack">
          <h1>Dynamic Form Generator</h1>

          <FormGenerator />
        </div>
        {/* <div style={{ borderBottom: "1px solid #000", margin: "0px 20px" }}></div> */}
      </div>
      <FormFields />
    </>
  );
}

export default App;
