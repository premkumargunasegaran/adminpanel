import React, { useState } from "react";
import API_URL from "../apiConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    address: "",
    status: "",
  };

  const obj = {
    name: "prem",
    phone: "43333",
    email: "cdd@gmail.cm",
    address: "dkcjdvjedkjvhedjkv",
    status: "Active",
  };

  const array = ["prem", "43333", "cdd@gmail.cm"];
  console.log([...array, "prem"]);
  console.log(array);
  //   console.log(name);
  //   console.log(API_URL.user);

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("hello");
    setValues({ ...values, [name]: value });
    // console.log(values);
  };

  const postdata = async (e) => {
    e.preventDefault();
    // const { name, phone, email, address } = values;
    // if (name !== "" || name.length <= 0 && phone !== "")  phone.length <= 0 &&  ) {
    return await axios.post(`${API_URL}/user`, values).then((res) => {
      setValues({
        name: "",
        phone: "",
        email: "",
        address: "",
        status: "",
      });

      navigate("/");
    });
    // }
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">User Status Form</h2>
      <div className="row justify-content-center h-100 align-items-center">
        <div className="col-md-6 p-5 card">
          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                max={10}
                value={values.phone}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div className="mb-3">
              <label className="mb-3" htmlFor="">
                User Status
              </label>

              <select
                className="form-select"
                aria-label="Default select example"
                name="status"
                value={values.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>
            </div>

            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                onChange={handleInputChange}
                name="address"
                value={values.address}
                rows="3"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={postdata}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
