const {
  searchEvents,
  createEvent,
  approveEvent,
  incrementEventView,
} = require("./event.service");
const Booking = require("../bookings/booking.model");
const Event = require("./event.model");
const aiService = require("../../../services/ai.service");

const { safeAsync } = require("../../utils/safeAsync");

const { getPendingEvents } = require("./event.service");

const aiClient = require("../../services/aiClient");
const Event = require("./event.model");

// =======================
// GET EVENTS
// =======================
const getEvents = async (req, res, next) => {
  try {
    const events = await searchEvents(req.query);
    res.json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
};

// =======================
// CREATE EVENT
// =======================
const createEventHandler = async (req, res, next) => {
  try {
    const role = req.headers["x-role"];
    const orgFromHeader = req.headers["x-organization-id"];
    const orgFromBody = req.body.organizationId || null;

    if (role === "organizer") {
      if (!orgFromHeader) {
        return res.status(403).json({
          message: "Organizer must belong to an organization",
        });
      }
      if (orgFromBody && orgFromBody !== orgFromHeader) {
        return res.status(403).json({
          message: "Cannot create event for another organization",
        });
      }
    }

    const event = await createEvent({
      ...req.body,
      organizationId: role === "organizer" ? orgFromHeader : orgFromBody,
    });

    res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

// =======================
// APPROVE EVENT
// =======================
const approveEventHandler = async (req, res, next) => {
  try {
    const adminId = req.headers["x-user-id"] || "admin_system";
    const event = await approveEvent(req.params.id, adminId);
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

/**
 * ADMIN: Get pending events for approval
 */

/**
 * ADMIN: Get pending events for approval
 */
const getPendingEventsHandler = async (req, res, next) => {
  try {
    const events = await getPendingEvents();
    res.json({
      success: true,
      data: events,
    });
  } catch (err) {
    next(err);
  }
};

// =======================
// AI SEARCH
// =======================
const aiSearchEvents = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: "query is required" });
  }

  const aiResult = await safeAsync(
    async () => aiService.search({ query }),
    null,
    "AI_SEARCH"
  );

  if (!aiResult || !aiResult.parsed_filters) {
    return res.json({ filters: {}, events: [] });
  }

  const mongoQuery = {
    isApproved: true,
    isPublished: true,
    ...aiResult.parsed_filters,
  };

  const events = await Event.find(mongoQuery).limit(20);

  return res.json({
    filters: aiResult.parsed_filters,
    events,
  });
};

// =======================
// EVENT VIEW TRACKING
// =======================
const incrementEventViewHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    await incrementEventView(eventId);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const aiSearchEventsProxy = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "query is required" });
    }

    // 1️⃣ Call AI service
    const aiResponse = await aiClient.post("/search", { query });

    const parsedFilters = aiResponse.data.parsed_filters || {};

    // 2️⃣ Use AI output to query MongoDB
    const mongoQuery = {
      isApproved: true,
      isPublished: true,
      ...parsedFilters,
    };

    const events = await Event.find(mongoQuery).limit(20);

    res.json({
      success: true,
      filters: parsedFilters,
      data: events,
    });
  } catch (error) {
    console.error("AI SEARCH ERROR:", error.message);

    // 3️⃣ SAFE FALLBACK (CRITICAL)
    const events = await Event.find({
      isApproved: true,
      isPublished: true,
    }).limit(20);

    res.json({
      success: true,
      fallback: true,
      data: events,
    });
  }
};

module.exports = {
  getEvents,
  createEventHandler,
  approveEventHandler,
  aiSearchEvents,
  incrementEventViewHandler,
  getPendingEventsHandler,
  aiSearchEventsProxy,
};
