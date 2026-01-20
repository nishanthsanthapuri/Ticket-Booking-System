const Waitlist = require("./waitlist.model");

const addToWaitlist = async ({ eventId, ticketId, userId }) => {
  return Waitlist.create({
    eventId,
    ticketId,
    userId,
  });
};

const getNextWaitlistedUser = async (ticketId) => {
  return Waitlist.findOne({
    ticketId,
    status: "WAITING",
  }).sort({ createdAt: 1 });
};

const markAllocated = async (waitlistId) => {
  return Waitlist.findByIdAndUpdate(
    waitlistId,
    { status: "ALLOCATED" },
    { new: true }
  );
};

module.exports = {
  addToWaitlist,
  getNextWaitlistedUser,
  markAllocated,
};
