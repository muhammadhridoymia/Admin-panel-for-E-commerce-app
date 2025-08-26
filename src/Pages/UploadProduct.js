import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    brand: "",
    sku: ""
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setImages(files);

    // create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    images.forEach((image) => data.append("images", image));

    try {
      const res = await axios.post("http://localhost:5000/api/upload/products", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("Product added:", res.data);
      alert("Product added successfully!");

      // Reset form
      setFormData({ name:"", description:"", price:"", category:"", subcategory:"", brand:"", sku:"" });
      setImages([]);
      setPreviewImages([]);
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          width: "500px", 
          padding: "30px", 
          backgroundColor: "white", 
          borderRadius: "10px", 
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)", 
          display: "flex", 
          flexDirection: "column", 
          gap: "15px" 
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2485a6" }}>Add Product</h2>

        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name}
          onChange={handleChange} 
          required 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <textarea 
          name="description" 
          placeholder="Description" 
          value={formData.description}
          onChange={handleChange} 
          required 
          rows={4}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "none" }}
        />

        <input 
          type="number" 
          name="price" 
          placeholder="Price" 
          value={formData.price}
          onChange={handleChange} 
          required 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input 
          type="text" 
          name="category" 
          placeholder="Category" 
          value={formData.category}
          onChange={handleChange} 
          required 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input 
          type="text" 
          name="subcategory" 
          placeholder="Subcategory" 
          value={formData.subcategory}
          onChange={handleChange} 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input 
          type="text" 
          name="brand" 
          placeholder="Brand" 
          value={formData.brand}
          onChange={handleChange} 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input 
          type="text" 
          name="sku" 
          placeholder="SKU" 
          value={formData.sku}
          onChange={handleChange} 
          required 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleImageChange} 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        {/* Image Preview */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {previewImages.map((src, index) => (
            <img 
              key={index} 
              src={src} 
              alt={`preview-${index}`} 
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px", border: "1px solid #ccc" }} 
            />
          ))}
        </div>

        <button 
          type="submit"
          style={{ 
            padding: "12px", 
            backgroundColor: "#2485a6", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
            fontSize: "16px", 
            marginTop: "10px" 
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
