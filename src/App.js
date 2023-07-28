import "./App.css";
import { toast, ToastContainer } from "react-toastify";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Table from "./Component/Table";
import Add from "./Component/Add";

function App() {
  return (
    <>
      <ToastContainer />
      {/* <h1>Data Tables</h1> */}
      {/* <Table /> */}
      {/* <CrudComponent /> */}
      {/* <CrudComponentWithMultipleInputs /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />}></Route>
          <Route path="add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
