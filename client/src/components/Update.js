// src/components/Create.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const {id}=useParams();
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  
  const [inputdata, setInputData] = useState({
    receiverName: "",
    itemDescription: "",
    dateSent: "",
    courierNumber: "",
    companyName: "",
    deliveredDate: "",
    deliveryAddress: {
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    status: "",
  });
  const getdata = async () => {
    const data = await axios.get(`http://localhost:8000/read/${id}`);
    setInputData(data.data);
  };
  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);

    const year = dateObject.getUTCFullYear();
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  useEffect(()=>{
    getdata();
  },[]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:8000/update/${id}`,
      inputdata
    );
    console.log("data updated:", response);
    navigate("/");
  };
  return (
    <div className="container  d-flex  flex-column justify-content-center align-items-center mt-5">
      <Link to="/" className="btn btn-sm btn-primary">
        Home
      </Link>
      <form
        className="container d-flex flex-column justify-content-center align-item-center"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <div className="form-row">
          <div className="form-group col-md-6 mt-3">
            <label for="inputEmail4">
              <strong>Name</strong>
            </label>
            <input
              type="Name"
              className="form-control"
              id="inputEmail4"
              placeholder="Name"
              name="name"
              autoComplete="off"
              onChange={(e) => {
                setInputData({ ...inputdata, receiverName: e.target.value });
              }}
              value={inputdata.receiverName}
            />
          </div>
          <div className="form-group col-md-6 mt-3">
            <label for="birthday">
              <strong>Post Date</strong>
            </label>
            <input
              className="form-control"
              type="date"
              id="birthday"
              name="postdate"
              onChange={(e) => {
                setInputData({ ...inputdata, dateSent: e.target.value });
              }}
              value={formatDate(inputdata.dateSent)}
            ></input>
          </div>
          <div className="form-group col-md-6 mt-3">
            <label for="inputPassword4">
              <strong>Discription</strong>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="Write Discripton "
              autoComplete="off"
              onChange={(e) => {
                setInputData({ ...inputdata, itemDescription: e.target.value });
              }}
              value={inputdata.itemDescription}
            />
          </div>
        </div>
        <div className="form-group col-md-2 mt-3">
          <label for="inputZip">
            <strong>Courrier No</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="courierno"
            name="courierno"
            autoComplete="off"
            onChange={(e) => {
              setInputData({ ...inputdata, courierNumber: e.target.value });
            }}
            value={inputdata.courierNumber}
          />
        </div>
        <div className="form-group col-md-6 mt-3">
          <label for="inputEmail4">
            <strong>Company</strong>
          </label>
          <input
            type="name"
            className="form-control"
            id="inputEmail4"
            placeholder="Company name"
            name="companyname"
            autoComplete="off"
            onChange={(e) => {
              setInputData({ ...inputdata, companyName: e.target.value });
            }}
            value={inputdata.companyName}
          />
        </div>

        <label className="mt-3" for="inputAddress2">
          <strong>Addrass:</strong>
        </label>
        <div className="form-group col-md-4 mt-2">
          <label for="inputState">
            <strong>Country</strong>
          </label>
          <select
            id="inputState"
            className="form-control"
            name="country"
            onChange={(e) => {
              setInputData({
                ...inputdata,
                deliveryAddress: {
                  ...inputdata.deliveryAddress,
                  country: e.target.value,
                },
              });
            }}
            value={inputdata.deliveryAddress.country}
          >
            <option selected>Choose...</option>
            <option>India</option>
          </select>
        </div>
        <div className="form-group col-md-4 mt-2">
          <label for="inputState">
            <strong>State</strong>
          </label>
          <select
            id="inputState"
            className="form-control"
            name="state"
            onChange={(e) => {
              setInputData({
                ...inputdata,
                deliveryAddress: {
                  ...inputdata.deliveryAddress,
                  state: e.target.value,
                },
              });
            }}
            value={inputdata.deliveryAddress.state}
          >
            <option selected>Choose...</option>
            {indianStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6 mt-3">
            <label for="inputCity">
              <strong>City</strong>
            </label>
            <input
              type="name"
              className="form-control"
              id="inputCity"
              placeholder="City"
              autoComplete="off"
              name="city"
              onChange={(e) => {
                setInputData({
                  ...inputdata,
                  deliveryAddress: {
                    ...inputdata.deliveryAddress,
                    city: e.target.value,
                  },
                });
              }}
              value={inputdata.deliveryAddress.city}
            />
          </div>

          <div className="form-group col-md-2 mt-3">
            <label for="inputZip">
              <strong>Zip Code</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              placeholder="Zip Code"
              name="zipcode"
              autoComplete="off"
              onChange={(e) => {
                setInputData({
                  ...inputdata,
                  deliveryAddress: {
                    ...inputdata.deliveryAddress,
                    postalCode: e.target.value,
                  },
                });
              }}
              value={inputdata.deliveryAddress.postalCode}
            />
          </div>
        </div>
        <div className="form-group col-md-6 mt-3">
          <label for="birthday">
            <strong>Delivered Date</strong>
          </label>
          <input
            className="form-control"
            type="date"
            id="delivereddate"
            name="delivereddate"
            onChange={(e) => {
              setInputData({ ...inputdata, deliveredDate: e.target.value });
            }}
            value={formatDate(inputdata.deliveredDate)}
          ></input>
        </div>
        <div className="form-group col-md-4 mt-2">
          <label for="inputState">
            <strong>Status</strong>
          </label>
          <select
            id="inputState"
            className="form-control"
            name="status"
            onChange={(e) => {
              setInputData({ ...inputdata, status: e.target.value });
            }}
            value={inputdata.status}
          >
            <option selected>Choose...</option>
            <option>pending</option>
            <option>in-transit</option>
            <option>delivered</option>
          </select>
        </div>
        <input className="btn btn-primary" type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Update;
