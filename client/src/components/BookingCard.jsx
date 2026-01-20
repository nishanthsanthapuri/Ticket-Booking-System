import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 12,
        marginBottom: 12,
      }}
    >
      <p>
        <b>Booking ID:</b> {booking._id}
      </p>
      <p>
        <b>Status:</b> {booking.paymentStatus}
      </p>
      <p>
        <b>Quantity:</b> {booking.quantity}
      </p>

      {booking.paymentStatus === "SUCCESS" && (
        <button onClick={() => navigate(`/ticket/${booking._id}`)}>
          View Ticket (QR)
        </button>
      )}
    </div>
  );
};

export default BookingCard;
