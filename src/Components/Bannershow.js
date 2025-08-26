import React, { useEffect, useState } from "react";
import BannerUploader from '../Components/BannerUploader'

const AdBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
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

    fetchBanners();
  }, []);

  if (loading) return <p>Loading banners...</p>;

  return (
    <>
    <BannerUploader/>
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {banners.map((banner) => (
        <img
          key={banner._id}
          src={banner.adbanner}
          alt="Ad Banner"
          style={{
            width: "200px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      ))}
    </div>
    </>
  );
};

export default AdBanner;
