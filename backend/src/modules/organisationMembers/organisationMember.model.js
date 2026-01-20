const mongoose = require("mongoose");

const organisationMemberSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["OWNER", "ORGANIZER", "STAFF"],
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "REMOVED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrganisationMember", organisationMemberSchema);
