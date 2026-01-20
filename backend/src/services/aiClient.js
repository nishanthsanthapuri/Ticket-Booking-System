const axios = require("axios");

const AI_BASE_URL = process.env.AI_SERVICE_URL;

if (!AI_BASE_URL) {
  console.warn("⚠️ AI_SERVICE_URL not set");
}

const aiClient = axios.create({
  baseURL: AI_BASE_URL,
  timeout: 8000, // IMPORTANT: prevent hanging requests
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = aiClient;
