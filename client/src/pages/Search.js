import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Search = () => {
  const [courier, setCourier] = useState([]);
  const getCourier = async () => {
    const data = await axios.get("http://localhost:8000/allcourier");
    setCourier(data.data);
  };
  useEffect(() => {
    getCourier();
    console.log(courier);
  });

  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);

    const day = String(dateObject.getUTCDate()).padStart(2, "0");
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
    const year = dateObject.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }
  const [search, setSearch] = useState("");

  return (
    <div className="container mt-5">
      <div class="form-outline mb-4">
        <input
          type="search"
          class="form-control"
          id="datatable-search-input"
          placeholder="Enter CourierNumber , CompanyName or  Status"
        />
      </div>
      <div className="py-4">
        
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">s.n</th>
              <th scope="col">Name</th>
              <th scope="col">Dicription</th>
              <th scope="col">PostDate</th>
              <th scope="col">Courier No</th>
              <th scope="col">Company Name</th>
              <th scope="col">Status</th>
              <th scope="col">City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courier.map((c, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{c.receiverName}</td>
                  <td>{c.itemDescription}</td>

                  <td>{formatDate(c.dateSent)}</td>
                  <td>{c.courierNumber}</td>
                  <td>{c.companyName}</td>
                  <td>{c.status}</td>
                  <td>{c.deliveryAddress.city}</td>
                  <td>
                    <Link
                      className="btn btn-sm btn-info  me-2"
                      to={`/read/${c._id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-sm btn-outline-primary me-2"
                      to={`/update/${c._id}`}
                    >
                      Edit
                    </Link>
                    <Link
                      className="btn btn-sm btn-danger "
                      to={`/delete/${c._id}`}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
