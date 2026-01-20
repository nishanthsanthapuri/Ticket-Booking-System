const Event = require("../events/event.model");
const Booking = require("../bookings/booking.model");

const { safeAsync } = require("../../utils/safeAsync");

/**
 * EVENT CONVERSION FUNNEL ANALYTICS
 */
const getEventFunnelAnalytics = async (req, res) => {
  try {
    const { eventId } = req.params;

    // 1️⃣ Fetch event views
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const views = event.views || 0;

    // 2️⃣ Booking counts
    const totalBookings = await Booking.countDocuments({ eventId });

    const paidBookings = await Booking.countDocuments({
      eventId,
      paymentStatus: "SUCCESS",
    });

    const checkIns = await Booking.countDocuments({
      eventId,
      checkedIn: true,
    });

    // 3️⃣ Conversion rates (safe division)
    const viewToBooking =
      views > 0 ? ((totalBookings / views) * 100).toFixed(2) : "0.00";

    const bookingToPayment =
      totalBookings > 0
        ? ((paidBookings / totalBookings) * 100).toFixed(2)
        : "0.00";

    const paymentToAttendance =
      paidBookings > 0 ? ((checkIns / paidBookings) * 100).toFixed(2) : "0.00";

    // 4️⃣ Response
    res.json({
      success: true,
      eventId,
      funnel: {
        views,
        bookings: totalBookings,
        paidBookings,
        checkIns,
      },
      conversionRates: {
        viewToBooking: `${viewToBooking}%`,
        bookingToPayment: `${bookingToPayment}%`,
        paymentToAttendance: `${paymentToAttendance}%`,
      },
    });
  } catch (error) {
    console.error("Funnel analytics error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to compute funnel analytics",
    });
  }
};

const aiService = require("../../../services/ai.service");

/**
 * AI INSIGHTS FOR EVENT ANALYTICS
 * Advisory only — never blocks response
 */
const getEventAnalyticsInsights = async (req, res) => {
  try {
    const { eventId } = req.params;

    // 1️⃣ Fetch funnel data locally (source of truth)
    const Event = require("../events/event.model");
    const Booking = require("../bookings/booking.model");

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const views = event.views || 0;
    const bookings = await Booking.countDocuments({ eventId });
    const paid = await Booking.countDocuments({
      eventId,
      paymentStatus: "SUCCESS",
    });
    const checkIns = await Booking.countDocuments({
      eventId,
      checkedIn: true,
    });

    const payload = {
      views,
      bookings,
      paidBookings: paid,
      checkIns,
    };

    // 2️⃣ Ask AI for insights (NON-BLOCKING)
    let aiInsights = null;
    try {
      aiInsights = await aiService.post("/analytics/insights", payload);
    } catch (err) {
      console.warn("AI insights unavailable:", err.message);
    }

    // 3️⃣ Respond safely
    res.json({
      success: true,
      eventId,
      funnel: payload,
      insights:
        aiInsights?.data?.insights ||
        "Insufficient data for AI insights at this time.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Analytics insights failed safely",
    });
  }
};

const getAnalyticsInsights = async (req, res) => {
  try {
    const payload = {
      organizationId: req.headers["x-organization-id"] || null,
    };

    const aiInsights = await safeAsync(
      async () => aiService.post("/analytics/insights", payload),
      { insights: [] },
      "AI_ANALYTICS"
    );

    res.json({
      success: true,
      data: aiInsights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Analytics insights failed safely",
    });
  }
};

module.exports = {
  getEventFunnelAnalytics,
  getEventAnalyticsInsights,
  getAnalyticsInsights,
};
