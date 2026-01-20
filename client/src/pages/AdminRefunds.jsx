import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminRefunds = () => {
  const [refunds, setRefunds] = useState([]);

  const loadRefunds = async () => {
    const res = await api.get("/bookings/me"); // admin sees all in backend
    const requested = res.data.data.filter(
      (b) => b.refundStatus === "REQUESTED"
    );
    setRefunds(requested);
  };

  useEffect(() => {
    loadRefunds();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>💸 Refund Requests</h2>

      {refunds.length === 0 && <p>No refund requests</p>}

      {refunds.map((b) => (
        <div
          key={b._id}
          style={{ border: "1px solid #444", padding: 12, marginBottom: 10 }}
        >
          <p>
            <b>Booking:</b> {b._id}
          </p>
          <p>
            <b>User:</b> {b.userId}
          </p>
          <p>
            <b>Status:</b> {b.refundStatus}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminRefunds;
