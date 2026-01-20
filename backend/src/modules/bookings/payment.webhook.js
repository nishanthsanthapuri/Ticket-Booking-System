const crypto = require("crypto");
const Booking = require("./booking.model");
const { createLedgerEntry } = require("../payments/paymentLedger.service");
const { createAuditLog } = require("../auditLogs/auditLog.service");

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

/**
 * Razorpay Webhook Handler
 */
const handleRazorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const payload = JSON.stringify(req.body);

    // 1️⃣ Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(401).json({ message: "Invalid webhook signature" });
    }

    // 2️⃣ Extract event
    const event = req.body.event;
    const paymentEntity = req.body.payload.payment.entity;

    const bookingId = paymentEntity.notes?.bookingId;

    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID missing in payment" });
    }

    // 3️⃣ Handle success
    if (event === "payment.captured") {
      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      if (booking.paymentStatus === "SUCCESS") {
        return res.json({ received: true }); // idempotent
      }

      // Ledger entry
      await createLedgerEntry({
        bookingId,
        orderId: paymentEntity.order_id,
        amount: paymentEntity.amount / 100,
        status: "SUCCESS",
        metadata: {
          gateway: "RAZORPAY",
          paymentId: paymentEntity.id,
        },
      });

      // Update booking
      booking.paymentStatus = "SUCCESS";
      booking.ticketToken = crypto.randomBytes(16).toString("hex");
      await booking.save();

      // Audit log
      await createAuditLog({
        action: "PAYMENT_CONFIRMED",
        entityType: "Booking",
        entityId: booking._id,
        performedBy: "razorpay",
        role: "system",
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(500).json({ message: "Webhook handling failed" });
  }
};

module.exports = {
  handleRazorpayWebhook,
};

// const crypto = require("crypto");
// const Booking = require("./booking.model");

// const handleRazorpayWebhook = async (req, res) => {
//   const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

//   const signature = crypto
//     .createHmac("sha256", secret)
//     .update(JSON.stringify(req.body))
//     .digest("hex");

//   if (signature !== req.headers["x-razorpay-signature"]) {
//     return res.status(400).send("Invalid signature");
//   }

//   const event = req.body;

//   if (event.event === "payment.captured") {
//     const bookingId = event.payload.payment.entity.notes.bookingId;

//     await Booking.findByIdAndUpdate(bookingId, {
//       paymentStatus: "SUCCESS",
//     });
//   }

//   res.json({ status: "ok" });
// };

// module.exports = { handleRazorpayWebhook };
