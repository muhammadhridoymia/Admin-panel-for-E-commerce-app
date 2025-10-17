// ...existing code...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css.css/Home.css";

const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card" style={{ borderLeft: `6px solid ${color}` }}>
    <div className="stat-icon" style={{ background: color + "22" }}>{icon}</div>
    <div className="stat-body">
      <div className="stat-value">{value ?? "—"}</div>
      <div className="stat-title">{title}</div>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ users: null, products: null, orders: null });
  const [query, setQuery] = useState("");

  useEffect(() => {
    // TODO: replace with real API calls
    // Example:
    // fetch("/api/admin/stats")
    //   .then(r => r.json())
    //   .then(data => setCounts({ users: data.users, products: data.products, orders: data.orders }));

    // mock demo values
    const timer = setTimeout(() => {
      setCounts({ users: 1240, products: 872, orders: 312 });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-root">
      <header className="topbar">
        <div>
          <h1 className="title">E‑commerce Admin Dashboard</h1>
          <p className="subtitle">Overview & quick actions</p>
        </div>
        <div className="top-actions">
          <input
            className="search"
            placeholder="Search users, products, orders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn primary" onClick={() => navigate("/add-product")}>
            + Add Product
          </button>
        </div>
      </header>

      <main className="container">
        <section className="left-panel">
          <div className="options-grid">
            <div className="option" onClick={() => navigate("/allusers")}>
              <div className="opt-icon">👥</div>
              <div className="opt-text">All Users</div>
              <div className="opt-sub">{counts.users ?? "—"} total</div>
            </div>

            <div className="option" onClick={() => navigate("/allproducts")}>
              <div className="opt-icon">📦</div>
              <div className="opt-text">All Products</div>
              <div className="opt-sub">{counts.products ?? "—"} total</div>
            </div>

            <div className="option" onClick={() => navigate("/orders")}>
              <div className="opt-icon">🧾</div>
              <div className="opt-text">Orders</div>
              <div className="opt-sub">{counts.orders ?? "—"} active</div>
            </div>

            <div className="option" onClick={() => navigate("/advertisements")}>
              <div className="opt-icon">📣</div>
              <div className="opt-text">Advertisements</div>
              <div className="opt-sub">Manage campaigns</div>
            </div>
          </div>
        </section>

        <aside className="right-panel">
          <div className="stats-row">
            <StatCard
              title="Total Users"
              value={counts.users}
              color="#4CAF50"
              icon={<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4CAF50" d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM2 20c0-3.31 4.03-6 10-6s10 2.69 10 6v2H2v-2z"/></svg>}
            />
            <StatCard
              title="Total Products"
              value={counts.products}
              color="#2196F3"
              icon={<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#2196F3" d="M12 2L2 7v13h20V7L12 2zM12 4.2l7 3.1v2.9l-7-3-7 3V7.3l7-3.1z"/></svg>}
            />
            <StatCard
              title="Total Orders"
              value={counts.orders}
              color="#FF9800"
              icon={<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#FF9800" d="M20 8H4V6h16v2zM4 10h16v6H4zM6 18h2v2H6zM16 18h2v2h-2z"/></svg>}
            />
          </div>

          <div className="panel recent">
            <div className="panel-header">
              <h3>Recent Activity</h3>
              <button className="btn small" onClick={() => navigate("/activity")}>View all</button>
            </div>
            <div className="panel-body">
              <p className="muted">No recent activity available — integrate events or logs here.</p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Home;
// ...existing code...