const mongoose = require("mongoose");

const paymentLedgerSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },

    orderId: {
      type: String, // Razorpay order_id
      index: true,
    },

    paymentId: {
      type: String, // Razorpay payment_id
      index: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["CREATED", "SUCCESS", "FAILED", "REFUNDED"],
      required: true,
    },
    gateway: {
      type: String,
      default: "RAZORPAY",
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PaymentLedger", paymentLedgerSchema);
