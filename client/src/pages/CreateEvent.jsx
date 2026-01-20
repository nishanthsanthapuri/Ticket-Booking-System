import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    venue: "",
    category: "Tech",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createEvent = async () => {
    try {
      const res = await api.post("/events", form);
      const eventId = res.data.data._id;

      alert("Event created successfully");
      navigate(`/organizer/events/${eventId}/tickets`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Event</h2>

      {["title", "description", "city", "venue", "startDate", "endDate"].map(
        (field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            onChange={handleChange}
            style={{ display: "block", marginBottom: 10, padding: 8 }}
          />
        )
      )}

      <select name="category" onChange={handleChange}>
        <option>Tech</option>
        <option>Music</option>
        <option>Comedy</option>
        <option>Sports</option>
        <option>Workshop</option>
      </select>

      <br />
      <br />

      <button onClick={createEvent}>Create Event</button>
    </div>
  );
};

export default CreateEvent;
