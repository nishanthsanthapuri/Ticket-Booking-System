import { useState } from "react";
import api from "../api/axios";

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await api.post("/events/ai-search", { query });
      onResults(res.data.events || []);
    } catch (err) {
      console.error("AI search failed", err);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search events using AI (e.g. Tech events in Bangalore)"
        style={{ width: "70%", padding: 8 }}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
