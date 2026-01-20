import { useState } from "react";
import api from "../api/axios";
import { generateIdempotencyKey } from "../utils/idempotency";

const BookingBox = ({ ticket }) => {
  const [quantity, setQuantity] = useState(1);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1️⃣ Create Booking
  const createBooking = async () => {
    setLoading(true);
    try {
      const res = await api.post(
        "/bookings",
        {
          eventId: ticket.eventId,
          ticketId: ticket._id,
          quantity,
        },
        {
          headers: {
            "Idempotency-Key": generateIdempotencyKey(),
          },
        }
      );

      setBooking(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Pay for Booking (MOCK)
  const payBooking = async () => {
    try {
      await api.post(
        `/bookings/${booking._id}/pay`,
        { amount: ticket.price * quantity },
        {
          headers: {
            "Idempotency-Key": generateIdempotencyKey(),
          },
        }
      );

      alert("✅ Payment successful!");
    } catch {
      alert("Payment failed");
    }
  };

  return (
    <div style={{ border: "1px solid #999", padding: 12 }}>
      <p>
        <b>{ticket.name}</b>
      </p>
      <p>Price: ₹{ticket.price}</p>

      <label>
        Quantity:
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ marginLeft: 8 }}
        />
      </label>

      <br />
      <br />

      {!booking && (
        <button onClick={createBooking} disabled={loading}>
          {loading ? "Booking..." : "Book Ticket"}
        </button>
      )}

      {booking && (
        <button onClick={payBooking}>Pay ₹{ticket.price * quantity}</button>
      )}
    </div>
  );
};

export default BookingBox;
