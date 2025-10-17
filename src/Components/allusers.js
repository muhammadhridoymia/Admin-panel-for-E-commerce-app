import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../Components/UseContext";
import "../Css.css/Allusers.css";

function Allusers() {
  const { categoryName } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/get/admin`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.addresses[0]?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.addresses[0]?.area?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-users-container">
      {/* Header Section */}
      <header className="all-users-header">
        <h2>All Registered Users</h2>
        <p>Manage and view user details from your database</p>
      </header>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, identifier, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Identifier</th>
                <th>Phone</th>
                <th>City</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.identifier}</td>
                    <td>{user.addresses[0]?.phone || "N/A"}</td>
                    <td>{user.addresses[0]?.city || "N/A"}</td>
                    <td>{user.addresses[0]?.area || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Allusers;
