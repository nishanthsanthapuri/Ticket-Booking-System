import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const OrganizerEventBookings = () => {
  const { eventId } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api
      .get(`/bookings/events/${eventId}/bookings`)
      .then((res) => setBookings(res.data.data));
  }, [eventId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>🎟️ Event Bookings</h2>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{ border: "1px solid #444", padding: 12, marginBottom: 10 }}
        >
          <p>
            <b>User:</b> {b.userId?.email}
          </p>
          <p>
            <b>Ticket:</b> {b.ticketId?.name}
          </p>
          <p>
            <b>Price:</b> ₹{b.ticketId?.price}
          </p>
          <p>
            <b>Status:</b> {b.checkedIn ? "✅ Checked In" : "⏳ Not Checked In"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrganizerEventBookings;
