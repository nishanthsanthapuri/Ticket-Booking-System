import { useEffect, useState } from "react";
import api from "../api/axios";
import { loginAsOrganizer } from "../utils/organizerLogin";

import { Link } from "react-router-dom";

const OrganizerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = () => {
    loginAsOrganizer();
    alert("Logged in as Organizer");
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard/dashboard/organizer");

        setStats(res.data.data);
      } catch {
        setError("Failed to load dashboard");
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Organizer Dashboard</h2>

      <button onClick={handleLogin}>Login as Organizer</button>

      <br />
      <br />

      {error && <p>{error}</p>}

      {!stats && <p>Loading...</p>}

      {stats && (
        <div>
          <p>
            <strong>Total Events:</strong> {stats.totalEvents}
          </p>
          <p>
            <strong>Total Bookings:</strong> {stats.totalBookings}
          </p>
          <p>
            <strong>Total Revenue:</strong> ₹{stats.totalRevenue}
          </p>

          <hr />
          <Link to="/organizer/events">📋 Manage My Events</Link>
          <hr />
          <a href="/organizer/create-event">➕ Create Event</a>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;
