const express = require("express");
const router = express.Router();

const {
  getEventFunnelAnalytics,
  getEventAnalyticsInsights,
} = require("./analytics.controller");

const { requireRole } = require("../../middlewares/role.middleware");

const { getAnalyticsInsights } = require("./analytics.controller");

// Organizer / Admin analytics
router.get(
  "/events/:eventId/funnel",
  requireRole("organizer"),
  getEventFunnelAnalytics
);

router.get(
  "/events/:eventId/insights",
  requireRole("organizer"),
  getEventAnalyticsInsights
);

router.get("/insights", getAnalyticsInsights);

module.exports = router;
