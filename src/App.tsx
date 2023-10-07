import "./App.css";
import FormFields from "./components/FormFields/FormFields";
import { useSelector } from "react-redux";
import FormGenerator from "./components/FormGenerator/FormGenerator";
import { RootState } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
