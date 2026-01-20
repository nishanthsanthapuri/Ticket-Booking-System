import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminEventApproval = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const fetchPendingEvents = async () => {
    try {
      const res = await api.get("/events/pending");
      setEvents(res.data.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load pending events");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      setError("You must be logged in as admin");
      return;
    }

    fetchPendingEvents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Pending Event Approvals</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {events.length === 0 && !error && <p>No pending events</p>}

      {events.map((event) => (
        <div
          key={event._id}
          style={{
            border: "1px solid #444",
            padding: 12,
            marginBottom: 10,
          }}
        >
          <h4>{event.title}</h4>
          <p>{event.description}</p>
          <p>
            <b>City:</b> {event.city} | <b>Category:</b> {event.category}
          </p>

          <button
            onClick={async () => {
              await api.patch(`/events/${event._id}/approve`);
              fetchPendingEvents();
            }}
          >
            Approve Event
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminEventApproval;
