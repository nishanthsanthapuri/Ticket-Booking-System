const { addMemberToOrganization } = require("./organisationMember.service");

/**
 * Admin: Assign organizer to organization
 */
const addMemberToOrganizationHandler = async (req, res, next) => {
  try {
    const { organizationId, userId, role } = req.body;

    if (!organizationId || !userId) {
      return res.status(400).json({
        message: "organizationId and userId are required",
      });
    }

    const member = await addMemberToOrganization({
      organizationId,
      userId,
      role,
    });

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addMemberToOrganizationHandler,
};
