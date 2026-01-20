const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    // NEW FIELD FOR LIVE ATTENDANCE TRACKING
    liveAttendance: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
    },

    city: {
      type: String,
      required: true,
      index: true,
    },

    venue: {
      type: String,
    },

    category: {
      type: String,
      enum: ["Music", "Tech", "Comedy", "Sports", "Workshop"],
      required: true,
      index: true,
    },

    startDate: {
      type: Date,
      required: true,
      index: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
