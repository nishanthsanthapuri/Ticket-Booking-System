const Event = require("./event.model");
const { createAuditLog } = require("../auditLogs/auditLog.service");

const searchEvents = async (filters) => {
  const query = { isApproved: true, isPublished: true };
  if (filters.city) query.city = filters.city;
  if (filters.category) query.category = filters.category;
  return Event.find(query);
};

const createEvent = async (eventData) => {
  return Event.create({
    ...eventData,
    isApproved: false,
    isPublished: false,
  });
};

const approveEvent = async (eventId, adminId) => {
  const event = await Event.findByIdAndUpdate(
    eventId,
    { isApproved: true, isPublished: true },
    { new: true }
  );
  if (!event) throw new Error("Event not found");

  await createAuditLog({
    action: "EVENT_APPROVED",
    entityType: "Event",
    entityId: event._id,
    performedBy: adminId,
    role: "admin",
  });

  return event;
};

const incrementEventView = async (eventId) => {
  return Event.findByIdAndUpdate(
    eventId,
    { $inc: { views: 1 } },
    { new: true }
  );
};

/**
 * ADMIN: Fetch pending events
 */
const getPendingEvents = async () => {
  return Event.find({
    isApproved: false,
    isPublished: false,
  });
};

module.exports = {
  searchEvents,
  createEvent,
  approveEvent,
  incrementEventView,
  getPendingEvents,
};
