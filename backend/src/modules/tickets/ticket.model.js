const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      // Example: Early Bird, Gold, VIP
    },

    price: {
      type: Number,
      required: true,
    },

    totalQuantity: {
      type: Number,
      required: true,
    },

    soldQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
