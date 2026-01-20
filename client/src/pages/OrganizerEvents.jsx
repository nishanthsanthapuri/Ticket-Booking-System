import { useEffect, useState } from "react";
import api from "../api/axios";

import { Link } from "react-router-dom";

const OrganizerEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load organizer events");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "organizer") {
      setError("You must be logged in as organizer");
      return;
    }

    loadEvents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Events</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {events.length === 0 && !error && <p>No events created yet</p>}

      {events.map((event) => (
        <div
          key={event._id}
          style={{
            border: "1px solid #444",
            padding: 14,
            marginBottom: 12,
          }}
        >
          <h4>{event.title}</h4>
          <p>{event.description}</p>

          <p>
            <b>City:</b> {event.city} | <b>Category:</b> {event.category}
          </p>

          <p>
            <b>Status:</b>{" "}
            {event.isApproved
              ? "✅ Approved & Live"
              : "⏳ Pending Admin Approval"}
          </p>

          <div style={{ marginTop: 10 }}>
            <Link
              to={`/organizer/events/${event._id}/analytics`}
              style={{ marginRight: 12 }}
            >
              📊 Analytics
            </Link>

            <Link
              to={`/organizer/events/${event._id}/bookings`}
              style={{ marginRight: 12 }}
            >
              🎟️ Bookings
            </Link>

            <Link to={`/organizer/events/${event._id}/tickets`}>
              🎫 Tickets
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizerEvents;
