const express = require("express");
const router = express.Router();

const {
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
} = require("./booking.controller");

const { handleRazorpayWebhook } = require("./payment.webhook");
const { requireRole } = require("../../middlewares/role.middleware");
const { checkInHandler } = require("./checkin.controller");
const { rateLimit } = require("../../middlewares/rateLimit.middleware");

/**
 * CREATE BOOKING (rate-limited)
 */
router.post(
  "/bookings",
  rateLimit({
    keyPrefix: "booking:create",
    limit: 5,
    windowSeconds: 60,
  }),
  createBookingHandler
);

/**
 * BOOKING HISTORY
 */
router.get("/bookings/me", getMyBookingsHandler);

/**
 * PAY FOR BOOKING (rate-limited)
 */
router.post(
  "/bookings/:bookingId/pay",
  rateLimit({
    keyPrefix: "payment:pay",
    limit: 3,
    windowSeconds: 60,
  }),
  payBooking
);

/**
 * GET TICKET QR
 */
router.get("/bookings/:bookingId/ticket", getMyTicketHandler);

/**
 * UPDATE BOOKING (admin)
 */
router.patch("/bookings/:id", updateBookingHandler);

/**
 * CANCEL BOOKING
 */
router.post("/bookings/:bookingId/cancel", cancelBookingHandler);

/**
 * RETRY PAYMENT
 */
router.post("/bookings/:bookingId/retry-payment", retryPaymentHandler);

/**
 * REFUND REQUEST
 */
router.post("/bookings/:bookingId/refund", requestRefundHandler);

/**
 * CHECK-IN (staff only)
 */
router.post("/checkin", requireRole("staff"), checkInHandler);

/**
 * RAZORPAY WEBHOOK (kept for later)
 */
router.post("/payments/webhook", handleRazorpayWebhook);

router.get(
  "/events/:eventId/bookings",
  requireRole("organizer"),
  getBookingsByEventHandler
);

router.post(
  "/check-in/:bookingId",
  requireRole(["staff", "organizer"]),
  checkInBooking
);

module.exports = router;
