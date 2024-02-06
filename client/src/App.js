// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Create from "./components/Create";
import Update from "./components/Update";
import Delete from "./components/Delete";
import Read from "./components/Read";
import Home from "./pages/Home";
import Search from "./pages/Search";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/delete/:id" element={<Delete />} />
          <Route path="/read/:id" element={<Read />} />
        </Routes>
    </Router>
  );
};

export default App;
