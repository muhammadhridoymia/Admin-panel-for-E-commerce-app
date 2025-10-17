import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css.css/Home.css";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Welcome to the E-commerce Admin Dashboard</h1>
      <div className="options">
        <div className="option" onClick={() => navigate("/allusers")}>All Users</div>
        <div className="option" onClick={() => navigate("/allproducts")}>All Products</div>
        <div className="option" onClick={() => navigate("/orders")}>Orders</div>
        <div className="option" onClick={() => navigate("/advertisements")}>Advertisements</div>
      </div>
    </div>
  );
};

export default Home;
