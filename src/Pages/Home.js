import React, { useContext } from "react";
import { AppContext } from "../Components/UseContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { setCategoryName } = useContext(AppContext);

  const categories = [
    "allproducts",
    "flowers",
    "phone",
    "books",
    "cloth",
    "ad",
    "users",
  ];

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      minHeight: "100vh",
      padding: "20px",
      boxSizing: "border-box",
    },
    box: {
      backgroundColor: "#1058de",
      height: "120px",
      width: "190px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      margin: "10px",
      cursor: "pointer",
      borderRadius: "8px",
      fontWeight: "bold",
      transition: "transform 0.2s, background-color 0.2s",
    },
  };

  // Hover effect inline
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#0d46b3";
    e.target.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#1058de";
    e.target.style.transform = "scale(1)";
  };

  return (
    <div style={styles.container}>
      {categories.map((cat) => (
        <div
          key={cat}
          style={styles.box}
          onClick={() => {
            setCategoryName(cat);
            navigate("/category");
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default Home;
