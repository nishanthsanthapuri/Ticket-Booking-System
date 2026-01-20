import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/events/${event._id}`)}
      style={{
        border: "1px solid #ddd",
        padding: 12,
        marginBottom: 12,
        cursor: "pointer",
      }}
    >
      <h3>{event.title}</h3>
      <p>{event.description}</p>

      <p>
        <b>City:</b> {event.city}
      </p>
      <p>
        <b>Category:</b> {event.category}
      </p>
      <p>
        <b>Date:</b> {new Date(event.startDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default EventCard;
