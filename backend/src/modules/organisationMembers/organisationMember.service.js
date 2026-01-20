const OrganisationMember = require("./organisationMember.model");

/**
 * Assign a user to an organization
 */
const addMemberToOrganization = async ({
  organizationId,
  userId,
  role = "ORGANIZER",
}) => {
  // Prevent duplicate membership
  const existing = await OrganisationMember.findOne({
    organizationId,
    userId,
    status: "ACTIVE",
  });

  if (existing) {
    throw new Error("User already belongs to this organization");
  }

  return OrganisationMember.create({
    organizationId,
    userId,
    role,
  });
};

/**
 * Get organization membership for a user
 */
const getUserOrganization = async (userId) => {
  return OrganisationMember.findOne({
    userId,
    status: "ACTIVE",
  });
};

module.exports = {
  addMemberToOrganization,
  getUserOrganization,
};
