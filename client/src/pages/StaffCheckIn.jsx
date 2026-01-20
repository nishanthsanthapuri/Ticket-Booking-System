import { useState } from "react";
import api from "../api/axios";
import { loginAsStaff } from "../utils/staffLogin";

const StaffCheckIn = () => {
  const [bookingId, setBookingId] = useState("");
  const [ticketToken, setTicketToken] = useState("");
  const [message, setMessage] = useState("");

  // Simulate staff login
  const handleStaffLogin = () => {
    loginAsStaff();
    alert("Logged in as staff");
  };

  const handleCheckIn = async () => {
    try {
      const res = await api.post("/checkin", {
        bookingId,
        ticketToken,
      });

      setMessage(res.data.message || "Check-in successful");
    } catch (err) {
      setMessage(err.response?.data?.message || "Check-in failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Staff Check-In</h2>

      <button onClick={handleStaffLogin}>Login as Staff</button>

      <br />
      <br />

      <input
        placeholder="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        placeholder="Ticket Token"
        value={ticketToken}
        onChange={(e) => setTicketToken(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={handleCheckIn}>Check-In Ticket</button>

      <p>{message}</p>
    </div>
  );
};

export default StaffCheckIn;
