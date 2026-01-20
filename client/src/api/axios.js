import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  // baseURL: "https://ticket-booking-backend-m8qj.onrender.com/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 🔑 Attach auth headers on EVERY request
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const organizationId = localStorage.getItem("organizationId");

  if (userId) config.headers["x-user-id"] = userId;
  if (role) config.headers["x-role"] = role;
  if (organizationId) config.headers["x-organization-id"] = organizationId;

  return config;
});

export default api;
