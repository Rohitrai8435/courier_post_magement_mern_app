import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const [courier, setCourier] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getCourier = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/read/${id}`);
      setCourier(response.data);
    } catch (error) {
      console.error("Error fetching courier data:", error);
    }
  };
  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);

    const day = String(dateObject.getUTCDate()).padStart(2, "0");
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
    const year = dateObject.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }
  const deletecourier = async () => {
    await axios.delete(`http://localhost:8000/delete/${id}`);
    navigate("/");
  };
  useEffect(() => {
    getCourier();
  }, []); // Ensure that useEffect runs only once by passing an empty dependency array

  return (
    <div className="container d-flex  flex-column justify-content-center align-items-center mt-5 mt-5">
      <h2>Courier Data</h2>
      <div>
        <p>
          <strong>Name: {courier.receiverName}</strong>
        </p>
        <p>
          <strong>Post Date: {formatDate(courier.dateSent)}</strong>
        </p>
        <p>
          <strong>Description: {courier.itemDescription}</strong>
        </p>
        <p>
          <strong>Courier No: {courier.courierNumber}</strong>
        </p>
        <p>
          <strong>Company: {courier.companyName}</strong>
        </p>
        {courier.deliveryAddress && (
          <p>
            <h4>Address: </h4>
            <p>
              <ul>
                <li>
                  <strong>Country: </strong>
                  {courier.deliveryAddress.country}
                </li>
                <li>
                  <strong>State: </strong>
                  {courier.deliveryAddress.state}
                </li>
                <li>
                  <strong>Zip Code: </strong>
                  {courier.deliveryAddress.postalCode}
                </li>
                <li>
                  <strong>City: </strong>
                  {courier.deliveryAddress.city}
                </li>
              </ul>
            </p>
          </p>
        )}
        <p>
          <strong>
            Delivered Date:{" "}
            {formatDate(courier.deliveredDate) || "Not delivered"}
          </strong>
        </p>
        <p>
          <strong>Status: {courier.status}</strong>
        </p>
        <Link
          to={`/update/${courier._id}`}
          className="btn btn-sm btn-primary me-2"
        >
          Update
        </Link>
        <Link to="/" className="btn btn-sm btn-primary me-2">
          Home
        </Link>
        <div
          className="btn btn-sm btn-danger "
          onClick={() => {
            deletecourier();
          }}
        >
          Remove
        </div>
      </div>
    </div>
  );
};

export default Delete;
