const Event = require("../events/event.model");
const Booking = require("../bookings/booking.model");
const Organization = require("../organisations/organization.model");
const PaymentLedger = require("../payments/paymentLedger.model");
const AuditLog = require("../auditLogs/auditLog.model");

/**
 * ORGANIZER DASHBOARD
 */
const getOrganizerDashboard = async ({ userId }) => {
  // Events created by this organizer
  const events = await Event.find({ createdBy: userId }).select("_id");

  const eventIds = events.map((e) => e._id);

  const totalBookings = await Booking.countDocuments({
    eventId: { $in: eventIds },
    paymentStatus: "SUCCESS",
  });

  const revenueAgg = await PaymentLedger.aggregate([
    {
      $match: {
        bookingId: { $exists: true },
        status: "SUCCESS",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$amount" },
      },
    },
  ]);

  return {
    totalEvents: events.length,
    totalBookings,
    totalRevenue: revenueAgg[0]?.totalRevenue || 0,
  };
};

/**
 * ADMIN DASHBOARD
 */
const getAdminDashboard = async () => {
  const totalOrganizations = await Organization.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const totalEvents = await Event.countDocuments();

  const revenueAgg = await PaymentLedger.aggregate([
    { $match: { status: "SUCCESS" } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$amount" },
      },
    },
  ]);

  const fraudCount = await AuditLog.countDocuments({
    action: "FRAUD_DETECTED",
  });

  return {
    totalOrganizations,
    totalEvents,
    totalBookings,
    totalRevenue: revenueAgg[0]?.totalRevenue || 0,
    fraudAttempts: fraudCount,
  };
};

module.exports = {
  getOrganizerDashboard,
  getAdminDashboard,
};
