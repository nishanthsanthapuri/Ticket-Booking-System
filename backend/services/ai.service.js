const axios = require("axios");

const AI_BASE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

async function callAI(endpoint, payload) {
  try {
    const response = await axios.post(`${AI_BASE_URL}${endpoint}`, payload, {
      timeout: 3000, // NEVER block backend
    });

    return response.data;
  } catch (error) {
    console.error("⚠️ AI Service error:", error.message);
    return null; // graceful fallback
  }
}

module.exports = {
  search: (payload) => callAI("/search", payload),
  forecast: (payload) => callAI("/forecast", payload),
  fraud: (payload) => callAI("/fraud", payload),
  recommend: (payload) => callAI("/recommend", payload),
  feedback: (payload) => callAI("/feedback", payload),
};
