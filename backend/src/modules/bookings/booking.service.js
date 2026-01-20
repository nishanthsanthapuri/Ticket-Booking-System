const Booking = require("./booking.model");
const Ticket = require("../tickets/ticket.model");
const crypto = require("crypto");

const aiService = require("../../../services/ai.service");
const { createLedgerEntry } = require("../payments/paymentLedger.service");
const { createAuditLog } = require("../auditLogs/auditLog.service");

const {
  acquireTicketLock,
  releaseTicketLock,
} = require("../../services/inventoryLock.service");

const { safeAsync } = require("../../utils/safeAsync");

/**
 * CREATE BOOKING (LOCK + INVENTORY SAFE)
 */
const createBooking = async ({ eventId, ticketId, userId, quantity }) => {
  const lockAcquired = await acquireTicketLock(ticketId, userId);
  if (!lockAcquired) {
    throw new Error("Ticket is temporarily locked. Please try again.");
  }

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new Error("Ticket not found");

    if (ticket.eventId.toString() !== eventId) {
      throw new Error("Ticket does not belong to this event");
    }

    const available = ticket.totalQuantity - ticket.soldQuantity;
    if (available < quantity) {
      throw new Error("Not enough tickets available");
    }

    ticket.soldQuantity += quantity;
    await ticket.save();

    const booking = await Booking.create({
      eventId,
      ticketId,
      userId,
      quantity,
      paymentStatus: "PENDING",
    });

    createAuditLog({
      action: "BOOKING_CREATED",
      entityType: "Booking",
      entityId: booking._id,
      performedBy: userId,
      role: "attendee",
    }).catch(() => {});

    return booking;
  } finally {
    await releaseTicketLock(ticketId);
  }
};

/**
 * GET BOOKINGS BY USER
 */
const getBookingsByUser = async (userId) => {
  return Booking.find({ userId });
};

/**
 * MARK BOOKING AS PAID
 */
const markBookingAsPaid = async (bookingId) => {
  return Booking.findByIdAndUpdate(
    bookingId,
    {
      paymentStatus: "SUCCESS",
      ticketToken: crypto.randomBytes(16).toString("hex"),
    },
    { new: true }
  );
};

/**
 * PAY FOR BOOKING (PHASE 5.2 CORE)
 */
const payForBooking = async ({ bookingId, amount, userId, idempotencyKey }) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");

  if (booking.userId !== userId) {
    throw new Error("Unauthorized payment attempt");
  }

  if (booking.paymentStatus === "SUCCESS") {
    return booking; // idempotent-safe
  }

  await createLedgerEntry({
    bookingId,
    orderId: `manual_${crypto.randomUUID()}`,
    amount,
    status: "SUCCESS",
    metadata: {
      gateway: "MOCK",
      idempotencyKey,
    },
  });

  return markBookingAsPaid(bookingId);
};

const checkBookingFraud = async ({
  userId,
  eventId,
  amount,
  paymentMethod,
}) => {
  return safeAsync(
    async () => {
      const aiResponse = await aiService.post("/fraud/check", {
        userId,
        eventId,
        amount,
        paymentMethod,
      });

      return aiResponse.data;
    },
    { fraudScore: 0, riskLevel: "LOW" },
    "AI_FRAUD_CHECK"
  );
};

const getDemandForecast = async ({ eventId }) => {
  return safeAsync(
    async () => {
      const aiResponse = await aiService.post("/demand/forecast", {
        eventId,
      });

      return aiResponse.data;
    },
    {
      demandScore: 0,
      demandLevel: "LOW",
      recommendation: "Normal demand",
    },
    "AI_DEMAND_FORECAST"
  );
};

const getPostBookingRecommendations = async ({ userId, eventId }) => {
  return safeAsync(
    async () => {
      const aiResponse = await aiService.post("/recommendations/post-booking", {
        userId,
        eventId,
      });

      return aiResponse.data;
    },
    { recommendations: [] },
    "AI_POST_BOOKING"
  );
};

module.exports = {
  createBooking,
  getBookingsByUser,
  markBookingAsPaid,
  payForBooking,
  checkBookingFraud,
  getDemandForecast,
  getPostBookingRecommendations,
};
