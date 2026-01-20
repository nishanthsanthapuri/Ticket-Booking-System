const {
  getOrganizerDashboard,
  getAdminDashboard,
} = require("./dashboard.service");

/**
 * Organizer Dashboard
 */
const organizerDashboardHandler = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(400).json({ message: "x-user-id header required" });
    }

    const data = await getOrganizerDashboard({ userId });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Admin Dashboard
 */
const adminDashboardHandler = async (req, res) => {
  try {
    const data = await getAdminDashboard();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  organizerDashboardHandler,
  adminDashboardHandler,
};
