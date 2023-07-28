import { React, useEffect, useState } from "react";
import axios from "axios";
import "./table.css";
import { Outlet, Link } from "react-router-dom";

function Table() {
  const [data, setdata] = useState([]);
  const [value, setvalue] = useState();
  const [sortvalue, setsortvalue] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    return await axios
      .get("http://localhost:8000/user")
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setvalue("");
    loadData();
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    setvalue(e.target.value);
    // console.log(value);
    return await axios
      .get(`http://localhost:8000/user?q=${value}`)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = async (id) => {
    return await axios.delete(`http://localhost:8000/user/${id}`).then(() => {
      loadData();
    });
    // console.log("prem");
  };
  const sortOptions = ["name", "adddress", "email", "phone", "status"];
  const handleshort = async (e) => {
    let value = e.target.value;
    setsortvalue(value);

    return await axios
      .get(`http://localhost:8000/user?_sort=${value}&_order=asc`)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFilter = async (value) => {
    return await axios
      .get(`http://localhost:8000/user?status=${value}`)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="table text-center mt-3 font-bold container">
      <h2>Datatables</h2>
      <div className="row justify-content-between ">
        <div className="col-md-2 d-flex mb-3">
          <Link to="/add">
            <button className="btn btn-success bg-success text-white">
              Add New
            </button>
          </Link>
        </div>
        <div className="col-md-4 d-flex ">
          <form action="">
            <div className="form-group d-flex">
              <input
                type="text"
                className="form-control w-75"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={value}
                onChange={handleSearch}
                placeholder="Search......"
              />

              <button className="btn btn-info ms-2" onClick={handleSearch}>
                search
              </button>
              <button className="btn btn-danger ms-2" onClick={handleReset}>
                reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">phone</th>
            <th scope="col">address</th>
            <th scope="col">status</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7}>No data found</td>
            </tr>
          ) : (
            data &&
            data.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.phone}</td>
                  <td>{val.address}</td>
                  <td>{val.status ? "active" : "inactive"}</td>
                  <td>
                    <button className="btn btn-success me-3">Edit</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(val.id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <nav aria-label="..." className="my-0 mx-auto">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled p-0">
            <span class="page-link">Previous</span>
          </li>
          <li class="page-item p-0">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item active p-0" aria-current="page">
            <span class="page-link">2</span>
          </li>
          <li class="page-item p-0">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item p-0 ">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
      <div className="row my-5 justify-content-between">
        <div className="col-md-3 ">
          <h4 className="text-start mb-0">Sort By</h4>
          <select
            className="form-select mb-5"
            aria-label="Default select example"
            name="status"
            value={sortvalue}
            onChange={handleshort}
          >
            <option> Please Select value</option>
            {sortOptions &&
              sortOptions.map((value, i) => {
                return (
                  <option value={value} key={i}>
                    {value}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col-md-3 ">
          <h4 className="text-start mb-0">Sort By Status</h4>

          <button
            class="btn btn-info ms-2 bg-info text-white"
            onClick={() => {
              handleFilter("active");
            }}
          >
            Active
          </button>
          <button
            class="btn btn-danger ms-2 bg-danger text-white"
            onClick={() => {
              handleFilter("inactive");
            }}
          >
            InActive
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
