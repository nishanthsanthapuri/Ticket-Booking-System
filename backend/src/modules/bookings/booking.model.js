const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    userId: {
      type: String,
      required: true,
      // Simulated user (JWT later)
    },

    quantity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },
    // PAYMENT DETAILS
    paymentId: {
      type: String,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    // To track payment retries

    paymentAttempts: {
      type: Number,
      default: 0,
    },

    refundStatus: {
      type: String,
      enum: ["NONE", "REQUESTED", "COMPLETED"],
      default: "NONE",
    },

    // UPDATE BOOKING MODEL (ADD TICKET TOKEN)

    ticketToken: {
      type: String,
      unique: true,
    },

    checkedIn: {
      type: Boolean,
      default: false,
    },
    // To track check-in time
    checkedInAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
// This schema defines the structure of a booking document in MongoDB.
// It includes fields for event ID, ticket ID, user ID, quantity, and status.
// The timestamps option automatically adds createdAt and updatedAt fields.
// The status field can be either "CONFIRMED" or "CANCELLED", with "CONFIRMED" as the default value.
// The eventId and ticketId fields reference the Event and Ticket models, respectively.
