import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const TicketQR = () => {
  const { bookingId } = useParams();
  const [qr, setQr] = useState(null);

  useEffect(() => {
    api
      .get(`/bookings/${bookingId}/ticket`)
      .then((res) => setQr(res.data.ticket.qrCode))
      .catch(() => alert("Ticket not available"));
  }, [bookingId]);

  if (!qr) return <p>Loading QR...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Ticket</h2>
      <img src={qr} alt="Ticket QR Code" />
      <p>Show this QR at the venue</p>
    </div>
  );
};

export default TicketQR;
