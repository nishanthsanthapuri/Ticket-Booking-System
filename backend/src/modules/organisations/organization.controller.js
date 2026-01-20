const {
  createOrganization,
  getOrganizationById,
  getAllOrganizations,
} = require("./organization.service");

/**
 * Admin: Create organization
 */
const createOrganizationHandler = async (req, res, next) => {
  try {
    const { name, description, ownerId } = req.body;

    const organization = await createOrganization({
      name,
      description,
      ownerId,
    });

    res.status(201).json({
      success: true,
      data: organization,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Admin: Get organization by ID
 */

const mongoose = require("mongoose");
const getOrganizationByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid organization ID",
      });
    }

    const organization = await getOrganizationById(id);

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    res.json({
      success: true,
      data: organization,
    });
  } catch (err) {
    next(err);
  }
};
/**
 * Admin: List all organizations
 */
const getAllOrganizationsHandler = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();

    res.json({
      success: true,
      data: organizations,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrganizationHandler,
  getOrganizationByIdHandler,
  getAllOrganizationsHandler,
};
