// import { useParams } from "react-router-dom";

// const OrganizerEventAnalytics = () => {
//   const { eventId } = useParams();

//   const revenue = bookings.reduce(
//     (sum, b) => sum + (b.ticketId?.price || 0),
//     0
//   );

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Event Analytics</h2>
//       <p>Event ID: {eventId}</p>

//       <h3>Total Revenue: ₹{revenue}</h3>

//       <p>This screen will show:</p>
//       <ul>
//         <li>Views</li>
//         <li>Bookings</li>
//         <li>Revenue</li>
//         <li>AI demand insights</li>
//       </ul>
//     </div>
//   );
// };

// export default OrganizerEventAnalytics;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const OrganizerEventAnalytics = () => {
  const { eventId } = useParams();

  // ✅ DEFINE STATE (this was missing)
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;

    const fetchBookings = async () => {
      try {
        const res = await api.get(`/bookings/events/${eventId}/bookings`);
        setBookings(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics");
      }
    };

    fetchBookings();
  }, [eventId]);

  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    api
      .post("/ai/forecast", {
        category: event.category,
        city: event.city,
        days_to_event: 5,
      })
      .then((res) => setForecast(res.data));
  }, []);

  // ✅ SAFE CALCULATIONS
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const checkedInCount = bookings.filter((b) => b.checkedIn).length;

  return (
    <div style={{ padding: 20 }}>
      <h2>Event Analytics</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        <strong>Total Bookings:</strong> {totalBookings}
      </p>

      <p>
        <strong>Total Revenue:</strong> ₹{totalRevenue}
      </p>

      {forecast && (
        <p>📈 Expected Attendance: {forecast.predicted_attendance}</p>
      )}

      <p>
        <strong>Checked-in Attendees:</strong> {checkedInCount}
      </p>
    </div>
  );
};

export default OrganizerEventAnalytics;
