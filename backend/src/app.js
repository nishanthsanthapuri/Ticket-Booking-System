const express = require("express");
const cors = require("cors");

const app = express();

/* ✅ 1. CORS MUST BE FIRST */
app.use(
  cors({
    origin: "*", // safe for now
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-user-id",
      "x-role",
      "x-organization-id",
      "Idempotency-Key",
    ],
  })
);

/* ✅ 2. Explicitly allow preflight */
app.options("*", cors());

/* ✅ 3. JSON parser */
app.use(express.json());

/* ✅ 4. Razorpay webhook ONLY */
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

/* ✅ Health */
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ✅ Routes */
app.use("/api/events", require("./modules/events/event.routes"));
app.use("/api", require("./modules/tickets/ticket.routes"));
app.use("/api", require("./modules/bookings/booking.routes"));

/* ✅ Error handler LAST */
const errorMiddleware = require("./middlewares/error.middleware");
app.use(errorMiddleware);

module.exports = app;

// const express = require("express");
// const app = express();

// const cors = require("cors");

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "x-user-id",
//       "x-role",
//       "x-organization-id",
//       "Idempotency-Key",
//     ],
//   })
// );

// app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// app.use(express.json());

// app.get("/health", (req, res) => {
//   res.json({ status: "OK" });
// });

// app.use("/api/events", require("./modules/events/event.routes"));
// app.use("/api", require("./modules/tickets/ticket.routes"));
// app.use("/api", require("./modules/bookings/booking.routes"));

// const eventRoutes = require("./modules/events/event.routes");

// app.use("/api", eventRoutes);

// const healthRoutes = require("./routes/health.routes");
// app.use("/api", healthRoutes);

// const errorMiddleware = require("./middlewares/error.middleware");
// app.use(errorMiddleware);

// require("./routes")(app);

// require("./routes");

// // app.use("/api", routes);

// module.exports = app;
// This is the main application file for the ticket booking platform's backend.
// It sets up an Express.js server, configures middleware for JSON parsing, and defines a health check endpoint.
// The application uses modular routing to handle different functionalities:
// - `/api/events` for event-related operations,
// - `/api` for ticket-related operations,
// - `/api` for booking-related operations.
// The app is exported for use in other parts of the application, such as the server setup file.
// The health check endpoint returns a simple JSON response indicating the server's status.
// This structure allows for easy expansion and maintenance of the codebase as new features are added.
