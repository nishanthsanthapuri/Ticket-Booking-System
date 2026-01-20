const express = require("express");
const router = express.Router();

const {
  createOrganizationHandler,
  getOrganizationByIdHandler,
  getAllOrganizationsHandler,
} = require("./organization.controller");

const { requireRole } = require("../../middlewares/role.middleware");

// Admin-only routes

// Create organization
router.post("/", requireRole("admin"), createOrganizationHandler);

// List all organizations
router.get("/", requireRole("admin"), getAllOrganizationsHandler);

// Get organization by ID
router.get("/:id", requireRole("admin"), getOrganizationByIdHandler);

module.exports = router;
