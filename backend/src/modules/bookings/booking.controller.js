const Booking = require("./booking.model");
const Ticket = require("../tickets/ticket.model");
const { generateQRCode } = require("../../utils/qr");
const validateObjectId = require("../../utils/validateObjectId");

const {
  createBooking,
  getBookingsByUser,
  payForBooking,
} = require("./booking.service");

const {
  getNextWaitlistedUser,
  markAllocated,
} = require("../waitlist/waitlist.service");
const { checkInBooking } = require("./checkin.controller");

/**
 * CREATE BOOKING
 */
const createBookingHandler = async (req, res) => {
  try {
    const idempotencyKey = req.headers["idempotency-key"];
    if (!idempotencyKey) {
      return res.status(400).json({
        message: "Idempotency-Key header required",
      });
    }

    const booking = await createBooking({
      ...req.body,
      userId: req.headers["x-user-id"],
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * GET MY BOOKINGS
 */
const getMyBookingsHandler = async (req, res) => {
  const userId = req.headers["x-user-id"];
  const bookings = await getBookingsByUser(userId);

  res.json({
    success: true,
    data: bookings,
  });
};

/**
 * PAY FOR BOOKING (PHASE 5 CORE)
 */

const payBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const { amount } = req.body;
    const userId = req.headers["x-user-id"];
    const idempotencyKey = req.headers["idempotency-key"];

    if (!bookingId || !amount || !idempotencyKey) {
      return res.status(400).json({
        message: "bookingId, amount and Idempotency-Key are required",
      });
    }

    const result = await payForBooking({
      bookingId,
      amount,
      userId,
      idempotencyKey,
    });

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * GET TICKET QR
 */
const getMyTicketHandler = async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.headers["x-user-id"];

  const booking = await Booking.findOne({
    _id: bookingId,
    userId,
    paymentStatus: "SUCCESS",
  });

  if (!booking || !booking.ticketToken) {
    return res.status(404).json({ message: "Ticket not available" });
  }

  if (booking.checkedIn) {
    return res.status(400).json({ message: "Already checked in" });
  }

  const qrCode = await generateQRCode(
    JSON.stringify({
      bookingId: booking._id,
      ticketToken: booking.ticketToken,
    })
  );

  res.json({
    success: true,
    ticket: {
      bookingId: booking._id,
      qrCode,
    },
  });
};

/**
 * UPDATE BOOKING (ADMIN)
 */
const updateBookingHandler = async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  const booking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  res.json({ success: true, booking });
};

/**
 * CANCEL BOOKING
 */
const cancelBookingHandler = async (req, res) => {
  const { bookingId } = req.params;

  if (!validateObjectId(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "CANCELLED";
  booking.paymentStatus = "FAILED";
  await booking.save();

  const ticket = await Ticket.findById(booking.ticketId);
  ticket.soldQuantity -= booking.quantity;
  await ticket.save();

  const waitlisted = await getNextWaitlistedUser(ticket._id);
  if (waitlisted) {
    ticket.soldQuantity += 1;
    await ticket.save();

    await Booking.create({
      eventId: waitlisted.eventId,
      ticketId: ticket._id,
      userId: waitlisted.userId,
      quantity: 1,
      paymentStatus: "PENDING",
    });

    await markAllocated(waitlisted._id);
  }

  res.json({ success: true, message: "Booking cancelled successfully" });
};

/**
 * RETRY PAYMENT
 */
const retryPaymentHandler = async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  res.json({
    success: true,
    message: "Payment retry initiated",
  });
};

/**
 * REFUND REQUEST
 */
const requestRefundHandler = async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.refundStatus = "REQUESTED";
  await booking.save();

  res.json({ success: true, message: "Refund request recorded" });
};

const getBookingsByEventHandler = async (req, res) => {
  const { eventId } = req.params;

  const bookings = await Booking.find({ eventId })
    .populate("ticketId", "name price")
    .populate("userId", "email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: bookings,
  });
};

module.exports = {
  createBookingHandler,
  getMyBookingsHandler,
  payBooking,
  getMyTicketHandler,
  updateBookingHandler,
  cancelBookingHandler,
  retryPaymentHandler,
  requestRefundHandler,
  getBookingsByEventHandler,
  checkInBooking,
};
