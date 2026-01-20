const express = require("express");
const router = express.Router();

const {
  createTicketHandler,
  getTicketsHandler,
} = require("./ticket.controller");

const { requireRole } = require("../../middlewares/role.middleware");

// Organizer creates ticket types
router.post(
  "/events/:eventId/tickets",
  requireRole("organizer"),
  createTicketHandler
);

// Public view ticket availability
router.get("/events/:eventId/tickets", getTicketsHandler);

module.exports = router;
// This file defines the routes for ticket management in the application.
// It includes routes for creating ticket types and viewing ticket availability for events.
// The routes are protected by role-based access control, allowing only organizers to create tickets.
// Public users can view ticket availability for specific events.
// The routes are structured to handle ticket-related operations in a RESTful manner, ensuring clarity and maintainability.
// The router is exported for use in the main application file, allowing it to be mounted on a specific path.
// This modular approach helps in organizing the codebase and separating concerns within the application.
// The use of middleware for role checking ensures that only authorized users can perform certain actions, enhancing security.
// Overall, this file plays a crucial role in managing ticket-related functionalities within the event management system.
// The routes are designed to be intuitive and follow best practices for RESTful API design, making it easier for developers to understand and use the ticketing features of the application.
// The router is integrated with the main application, allowing it to handle ticket-related requests efficiently.
// This modular design promotes code reusability and maintainability, making it easier to manage ticket functionalities in the long run.
// The use of descriptive route paths and HTTP methods aligns with RESTful principles, ensuring that the API is user-friendly and easy to navigate.
// This file serves as a key component in the ticket management system, facilitating the creation and retrieval of ticket types for events.
