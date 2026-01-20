const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema(
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
    },
    status: {
      type: String,
      enum: ["WAITING", "ALLOCATED", "EXPIRED"],
      default: "WAITING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Waitlist", waitlistSchema);
