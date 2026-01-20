import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import BookingBox from "../components/BookingBox";

const EventDetails = () => {
  const { id } = useParams(); // ✅ FIX
  // console.log("EventDetails param id:", id);
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!id) return;

    // 1️⃣ Fetch event details
    api.get("/events").then((res) => {
      const found = res.data.data.find((e) => e._id === id);
      setEvent(found);
    });

    // 2️⃣ Track view (non-blocking)
    api.post(`/events/${id}/view`).catch(() => {});

    // 3️⃣ Fetch tickets
    api
      .get(`/tickets/events/${id}/tickets`)
      .then((res) => setTickets(res.data.data))
      .catch(() => {});
  }, [id]);

  if (!event) return <p>Loading event...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>

      <p>
        <b>City:</b> {event.city}
      </p>
      <p>
        <b>Venue:</b> {event.venue}
      </p>
      <p>
        <b>Category:</b> {event.category}
      </p>

      <h3>Available Tickets</h3>
      {tickets.length === 0 && <p>No tickets available</p>}

      {tickets.map((ticket) => (
        <BookingBox key={ticket._id} ticket={ticket} />
      ))}
    </div>
  );
};

export default EventDetails;
