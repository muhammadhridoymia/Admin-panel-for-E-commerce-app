import React, { useEffect, useState } from "react";
import BannerUploader from "../Components/BannerUploader";
import "../Css.css/AdBanner.css";

const AdBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/get/admin/adbanner`);
      if (!res.ok) throw new Error("Failed to fetch banners");
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error("Error loading banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Delete a banner
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const res = await fetch(`http://localhost:5000/api/delete/admin/adbanner/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete banner");
      setBanners((prev) => prev.filter((banner) => banner._id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("Failed to delete banner");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="banner-loading">
        <div className="spinner"></div>
        <p>Loading banners...</p>
      </div>
    );
  }

  return (
    <div className="ad-banner-container">
      <BannerUploader onUploadSuccess={fetchBanners} />

      <div className="banner-grid">
        {banners.length === 0 ? (
          <p>No banners found.</p>
        ) : (
          banners.map((banner) => (
            <div className="banner-card" key={banner._id}>
              <img src={banner.adbanner} alt="Ad Banner" className="banner-image" />
              <button
                className="delete-btn"
                onClick={() => handleDelete(banner._id)}
                disabled={deletingId === banner._id}
              >
                {deletingId === banner._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdBanner;
