const mongoose = require("mongoose");
const Booking = require("./booking.model");

// Import the incrementAttendance function
// const { incrementAttendance } = require("../events/eventAttendance.service");
const {
  incrementLiveAttendance,
} = require("../events/eventAttendance.service");
const checkInTicketHandler = async (req, res) => {
  const { bookingId, ticketToken } = req.body;

  // 1️⃣ Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  // 2️⃣ Find valid paid booking
  const booking = await Booking.findOne({
    _id: bookingId,
    ticketToken,
    paymentStatus: "SUCCESS",
  });

  if (!booking) {
    return res.status(400).json({
      message: "Invalid or unpaid ticket",
    });
  }

  // 3️⃣ Prevent duplicate entry
  if (booking.checkedIn) {
    return res.status(409).json({
      message: "Ticket already used",
    });
  }

  // 4️⃣ Mark check-in
  booking.checkedIn = true;
  booking.checkedInAt = new Date();
  await booking.save();
  await incrementLiveAttendance(booking.eventId);

  return res.json({
    success: true,
    message: "Check-in successful",
  });
};

// Import the checkInTicket service function
const { checkInTicket } = require("./checkin.service");

const checkInHandler = async (req, res) => {
  try {
    const booking = await checkInTicket(req.body);

    res.json({
      success: true,
      message: "Check-in successful",
      bookingId: booking._id,
    });
  } catch (err) {
    res.status(409).json({
      success: false,
      message: err.message,
    });
  }
};

const checkInBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Not found" });
  }

  if (booking.checkedIn) {
    return res.status(409).json({ message: "Already checked in" });
  }

  booking.checkedIn = true;
  booking.checkedInAt = new Date();
  await booking.save();

  res.json({ success: true });
};

module.exports = { checkInHandler, checkInTicketHandler, checkInBooking };
