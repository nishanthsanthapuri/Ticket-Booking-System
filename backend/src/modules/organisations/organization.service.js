const Organization = require("./organization.model");
const { createAuditLog } = require("../auditLogs/auditLog.service");

/**
 * Create a new organization (Admin only)
 */
const createOrganization = async ({ name, description, ownerId }) => {
  if (!name || !ownerId) {
    throw new Error("Organization name and ownerId are required");
  }

  const org = await Organization.create({
    name,
    description,
    ownerId,
    status: "ACTIVE",
  });

  await createAuditLog({
    action: "ORGANIZATION_CREATED",
    entityType: "Organization",
    entityId: org._id,
    performedBy: ownerId,
    role: "admin",
  });

  return org;
};

/**
 * Get organization by ID
 */
const getOrganizationById = async (organizationId) => {
  return Organization.findById(organizationId);
};

/**
 * List all organizations (Admin use later)
 */
const getAllOrganizations = async () => {
  return Organization.find({});
};

module.exports = {
  createOrganization,
  getOrganizationById,
  getAllOrganizations,
};
