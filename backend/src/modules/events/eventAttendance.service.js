const Booking = require("../bookings/booking.model");

const getAttendanceCount = async (eventId) => {
  return Booking.countDocuments({
    eventId,
    checkedIn: true,
  });
};

const Event = require("./event.model");

/**
 * Increment live attendance count for an event
 */
const incrementAttendance = async (eventId) => {
  await Event.findByIdAndUpdate(eventId, {
    $inc: { liveAttendance: 1 },
  });
};

/**
 * Decrement live attendance count (safety guard included)
 */
const decrementAttendance = async (eventId) => {
  await Event.findByIdAndUpdate(eventId, {
    $inc: { liveAttendance: -1 },
  });
};

// src/modules/events/eventAttendance.service.js

const incrementLiveAttendance = async (eventId) => {
  return Event.findByIdAndUpdate(
    eventId,
    { $inc: { liveAttendance: 1 } },
    { new: true }
  );
};

module.exports = {
  incrementAttendance,
  decrementAttendance,
  getAttendanceCount,
  incrementLiveAttendance,
};
