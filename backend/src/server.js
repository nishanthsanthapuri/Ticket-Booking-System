require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
require("./config/redis");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// This file is the entry point for the backend server.
// It connects to the database and starts the Express server.
// The server listens on the specified port and logs a message when it's ready.
// The database connection is established using the connectDB function from the config/db.js file.
// The server uses the app instance from app.js, which includes global middlewares and a health check endpoint.
