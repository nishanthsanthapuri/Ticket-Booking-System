const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      // e.g. BOOKING_CREATED, EVENT_APPROVED
    },

    entityType: {
      type: String,
      required: true,
      // e.g. Booking, Event
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    performedBy: {
      type: String,
      required: true,
      // userId / adminId
    },

    role: {
      type: String,
      // admin | organizer | staff | attendee
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
