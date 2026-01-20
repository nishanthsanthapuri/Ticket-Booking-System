import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const OrganizerTicketManager = () => {
  const { eventId } = useParams();

  const [tickets, setTickets] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const loadTickets = async () => {
    try {
      const res = await api.get(`/tickets/events/${eventId}/tickets`);
      setTickets(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets");
    }
  };

  useEffect(() => {
    loadTickets();
  }, [eventId]);

  const createTicket = async () => {
    if (!name || !price || !quantity) {
      setError("All fields are required");
      return;
    }

    try {
      await api.post(`/tickets/events/${eventId}/tickets`, {
        name,
        price: Number(price),
        totalQuantity: Number(quantity),
      });

      setName("");
      setPrice("");
      setQuantity("");
      setError("");
      loadTickets();
    } catch (err) {
      console.error(err);
      setError("Ticket creation failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Tickets</h2>

      <p>
        <b>Event ID:</b> {eventId}
      </p>

      <h3>Create New Ticket Type</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Ticket Name (VIP / General)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Price (₹)"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Total Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />
      <br />

      <button onClick={createTicket}>Create Ticket</button>

      <hr />

      <h3>Existing Tickets</h3>

      {tickets.length === 0 && <p>No tickets created yet</p>}

      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          style={{
            border: "1px solid #555",
            padding: 12,
            marginBottom: 10,
          }}
        >
          <h4>{ticket.name}</h4>
          <p>Price: ₹{ticket.price}</p>
          <p>
            Sold: {ticket.soldQuantity} / {ticket.totalQuantity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrganizerTicketManager;
