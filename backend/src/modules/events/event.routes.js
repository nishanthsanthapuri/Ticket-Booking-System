const express = require("express");
const router = express.Router();

const {
  getEvents,
  createEventHandler,
  approveEventHandler,
  aiSearchEvents,
  incrementEventViewHandler,
  getPendingEventsHandler,
  aiSearchEventsProxy,
} = require("./event.controller");

const { requireRole } = require("../../middlewares/role.middleware");
const { rateLimit } = require("../../middlewares/rateLimit.middleware");

// Public
router.get("/", getEvents);

// Organizer
router.post("/", requireRole("organizer"), createEventHandler);

// Admin
router.patch("/:id/approve", requireRole("admin"), approveEventHandler);

// Admin: pending event approvals
router.get("/pending", requireRole("admin"), getPendingEventsHandler);

// AI Search (rate-limited)
router.post(
  "/ai-search",
  rateLimit({
    keyPrefix: "ai:search",
    limit: 10,
    windowSeconds: 60,
  }),
  aiSearchEvents
);

router.post("/ai-search", aiSearchEventsProxy);

// View tracking
router.post("/:eventId/view", incrementEventViewHandler);

module.exports = router;
