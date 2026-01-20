import { useState } from "react";
import api from "../api/axios";

const AISearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await api.post("/events/ai-search", { query });
      onResults(res.data);
    } catch {
      console.error("AI search failed");
      onResults({ filters: {}, events: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Search events (e.g. Tech events in Bangalore under 500)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 10, width: "70%" }}
      />

      <button onClick={handleSearch} style={{ padding: 10, marginLeft: 10 }}>
        {loading ? "Searching..." : "AI Search"}
      </button>
    </div>
  );
};

export default AISearchBar;
