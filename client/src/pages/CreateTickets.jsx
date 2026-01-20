import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

const CreateTickets = () => {
  const { eventId } = useParams();

  const [ticket, setTicket] = useState({
    name: "",
    price: "",
    totalQuantity: "",
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const createTicket = async () => {
    try {
      await api.post(`/tickets/events/${eventId}/tickets`, ticket);
      alert("Ticket type created");
      setTicket({ name: "", price: "", totalQuantity: "" });
    } catch {
      alert("Failed to create ticket");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Ticket Types</h2>

      <input
        name="name"
        placeholder="Ticket Name (VIP / Gold)"
        value={ticket.name}
        onChange={handleChange}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={ticket.price}
        onChange={handleChange}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        name="totalQuantity"
        placeholder="Total Quantity"
        type="number"
        value={ticket.totalQuantity}
        onChange={handleChange}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={createTicket}>Add Ticket</button>
    </div>
  );
};

export default CreateTickets;
