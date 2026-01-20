import { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "../components/EventCard";
import AISearchBar from "../components/AISearchBar";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState(null);

  // Default load (normal events)
  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data.data);
    });
  }, []);

  // Handle AI results
  const handleAISearchResults = (data) => {
    setFilters(data.filters || null);
    setEvents(data.events || []);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Discover Events</h2>

      {/* AI SEARCH */}
      <AISearchBar onResults={handleAISearchResults} />

      {/* AI FILTERS DISPLAY */}
      {filters && (
        <div style={{ marginBottom: 20 }}>
          <b>AI Filters:</b>{" "}
          {Object.entries(filters)
            .filter(([_, v]) => v)
            .map(([k, v]) => (
              <span key={k} style={{ marginRight: 10 }}>
                {k}: {v}
              </span>
            ))}
        </div>
      )}

      {/* EVENTS */}
      {events.length === 0 && <p>No events found</p>}

      {events.map((event) => (
        <EventCard key={event._id || event.id} event={event} />
      ))}
    </div>
  );
};

export default Home;
