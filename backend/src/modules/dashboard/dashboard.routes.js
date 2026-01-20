const express = require("express");
const router = express.Router();

const {
  organizerDashboardHandler,
  adminDashboardHandler,
} = require("./dashboard.controller");

const { requireRole } = require("../../middlewares/role.middleware");

// Organizer dashboard
router.get(
  "/dashboard/organizer",
  requireRole("organizer"),
  organizerDashboardHandler
);

// Admin dashboard
router.get("/dashboard/admin", requireRole("admin"), adminDashboardHandler);

module.exports = router;
