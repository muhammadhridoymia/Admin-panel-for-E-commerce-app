import React, { useState, useEffect } from "react";
import axios from "axios";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [editingStock, setEditingStock] = useState({}); // { [productId]: number }

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get/products"); // replace with your API URL
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Helper to update local product stock state
  const updateLocalStock = (id, newStock) => {
    setProducts((prev) => prev.map(p => p._id === id ? { ...p, stock: newStock } : p));
  };

  // Save stock to backend (PATCH expects { stock: number })
  const saveStock = async (id) => {
    const intended = Number(editingStock[id] ?? products.find(p => p._id === id)?.stock ?? 0);
    // optimistic update
    const prevStock = products.find(p => p._id === id)?.stock;
    updateLocalStock(id, intended);
    try {
      await axios.patch(`http://localhost:5000/api/update/product/${id}`, { stock: intended });
      // clear editing value on success
      setEditingStock(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      console.error("Failed to save stock:", err);
      // revert on failure
      updateLocalStock(id, prevStock);
      alert("Failed to update stock on server.");
    }
  };

  const incrementStock = async (id, delta ) => {
    const current = products.find(p => p._id === id)?.stock ?? 0;
    const next = Number(current) + delta;
    setEditingStock(prev => ({ ...prev, [id]: next }));
    await saveStock(id);
  };

  const decrementStock = async (id, delta = 1) => {
    const current = products.find(p => p._id === id)?.stock ?? 0;
    const next = Math.max(0, Number(current) - delta);
    setEditingStock(prev => ({ ...prev, [id]: next }));
    await saveStock(id);
  };

  const markOutOfStock = async (id) => {
    setEditingStock(prev => ({ ...prev, [id]: 0 }));
    await saveStock(id);
  };

  return (
    <div style={{ width: "85%", backgroundColor: "#2485a6", padding: "20px", overflowY: "auto" }}>
  {products.length === 0 ? (
    <p style={{ color: "white" }}>No products found</p>
  ) : (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            width: "200px",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <img
            src={product.images[0]?.url}
            alt={product.images[0]?.alt}
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>
            Stock:{" "}
            <strong style={{ color: product.stock === 0 ? "crimson" : "black" }}>
              {product.stock}
            </strong>
          </p>

          {/* Stock controls */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: 8 }}>
            <button onClick={() => decrementStock(product._id, 1)} style={{ padding: "4px 8px" }}>-</button>
            <input
              type="number"
              value={editingStock[product._id] ?? product.stock}
              onChange={(e) => setEditingStock(prev => ({ ...prev, [product._id]: Number(e.target.value) }))}
              style={{ width: 60, textAlign: "center" }}
            />
            <button onClick={() => incrementStock(product._id, 1)} style={{ padding: "4px 8px" }}>+</button>
            <button onClick={() => saveStock(product._id)} style={{ padding: "4px 8px" }}>Save</button>
          </div>

          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button onClick={() => markOutOfStock(product._id)} style={{ padding: "4px 8px" }}>
              Mark Out of Stock
            </button>
            {/* add other admin actions here */}
          </div>

        </div>
      ))}
    </div>
  )}
</div>

  );
}

export default AllProducts;
