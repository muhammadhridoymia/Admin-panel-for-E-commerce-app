import React from "react";
import MainContent from "./fetchProduct";
import { useNavigate } from "react-router-dom";

function ProductCategories() {
  const navigate = useNavigate();

  // Categories list
  const categories = ["Phones", "Laptops", "Tablets", "Accessories", "Smart Watches", "Cameras"];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "15%", backgroundColor: "#57cff7", padding: "20px", boxSizing: "border-box" }}>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => alert(`${cat} clicked`)} // replace alert with real navigation if needed
            style={{
              width: "100%",
              height: "60px",
              backgroundColor: "white",
              borderRadius: "10px",
              marginBottom: "15px",
              fontSize: "18px",
              cursor: "pointer",
              border: "none"
            }}
          >
            {cat}
          </button>
        ))}

        <button
          onClick={() => navigate("/uploadproduct")}
          style={{
            width: "100%",
            height: "60px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            marginTop: "30px",
            fontSize: "18px",
            cursor: "pointer",
            border: "none"
          }}
        >
          Upload Product
        </button>
      </div>

      {/* Main content area */}
      <div style={{ width: "85%", backgroundColor: "#2485a6" }}>
        <MainContent/>
        {/* You can render main content here */}
      </div>
    </div>
  );
}

export default ProductCategories;
