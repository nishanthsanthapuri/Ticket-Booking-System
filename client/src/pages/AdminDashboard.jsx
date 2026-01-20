import { useState } from "react";
import api from "../api/axios";
import { loginAsAdmin } from "../utils/adminLogin";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    loginAsAdmin();
    alert("Logged in as Admin");
    await fetchDashboard();
  };

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard/dashboard/admin");
      setStats(res.data.data);
      setError("");
    } catch {
      setError("Access denied or failed to load admin dashboard");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogin}>Login as Admin</button>
      <br />
      <br />
      {error && <p>{error}</p>}
      {!stats && <p>Loading...</p>}
      {stats && (
        <div>
          <p>
            <strong>Total Organizations:</strong> {stats.totalOrganizations}
          </p>
          <p>
            <strong>Total Events:</strong> {stats.totalEvents}
          </p>
          <p>
            <strong>Total Bookings:</strong> {stats.totalBookings}
          </p>
          <p>
            <strong>Total Revenue:</strong> ₹{stats.totalRevenue}
          </p>
          <p>
            <strong>Fraud Attempts:</strong> {stats.fraudAttempts}
          </p>
        </div>
      )}
      <hr />
      <a href="/admin/events/pending">Approve Events</a>
      <hr />
      <a href="/admin/refunds">Refund Requests</a>
    </div>
  );
};

export default AdminDashboard;
