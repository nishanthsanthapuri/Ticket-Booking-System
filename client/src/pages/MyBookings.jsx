import { useEffect, useState } from "react";
import api from "../api/axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const res = await api.get("/bookings/me");
    setBookings(res.data.data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    await api.post(`/bookings/${id}/cancel`);
    loadBookings();
  };

  const retryPayment = async (id, amount) => {
    await api.post(
      `/bookings/${id}/retry-payment`,
      {},
      { headers: { "idempotency-key": Date.now().toString() } }
    );
    alert("Payment retry initiated");
  };

  const requestRefund = async (id) => {
    await api.post(`/bookings/${id}/refund`);
    alert("Refund requested");
    loadBookings();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎟️ My Bookings</h2>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{ border: "1px solid #444", padding: 12, marginBottom: 10 }}
        >
          <p>
            <b>Event:</b> {b.eventId?.title}
          </p>
          <p>
            <b>Status:</b> {b.paymentStatus}
          </p>

          {b.paymentStatus === "FAILED" && (
            <button onClick={() => retryPayment(b._id, b.amount)}>
              🔁 Retry Payment
            </button>
          )}

          {b.paymentStatus === "SUCCESS" && !b.checkedIn && (
            <button onClick={() => cancelBooking(b._id)}>
              ❌ Cancel Booking
            </button>
          )}

          {b.paymentStatus === "SUCCESS" && (
            <button onClick={() => requestRefund(b._id)}>
              💰 Request Refund
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
