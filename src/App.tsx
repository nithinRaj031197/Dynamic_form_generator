import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy, startTransition } from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Button from "./components/Button/Button";
import { useDispatch } from "react-redux";
import { openModal } from "./redux/formInputSlice";

const FormFields = lazy(() => import("./components/FormFields/FormFields"));
const FormGenerator = lazy(() => import("./components/FormGenerator/FormGenerator"));

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="main__container">
        <div className="top_rack">
          <h1>Dynamic Form Generator</h1>
          <Suspense fallback={<LoadingSpinner isLoading={true} />}>
            <FormGenerator />
          </Suspense>
        </div>
      </div>
      <div className="add_field_container">
        <Button
          className="add_field_btn"
          onClick={() => {
            startTransition(() => {
              dispatch(openModal());
            });
          }}
        >
          ADD FIELD
        </Button>
      </div>
      <Suspense fallback={<LoadingSpinner isLoading={true} />}>
        <FormFields />
      </Suspense>

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
