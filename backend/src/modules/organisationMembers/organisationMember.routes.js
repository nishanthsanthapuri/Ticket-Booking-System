const express = require("express");
const router = express.Router();

const {
  addMemberToOrganizationHandler,
} = require("./organisationMember.controller");

const { requireRole } = require("../../middlewares/role.middleware");

// Admin assigns organizer/staff to organization
router.post("/", requireRole("admin"), addMemberToOrganizationHandler);

module.exports = router;
