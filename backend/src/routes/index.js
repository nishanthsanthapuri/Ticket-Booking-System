module.exports = (app) => {
  // Health
  app.use("/health", require("./health.routes"));

  // Core APIs
  app.use("/api/events", require("../modules/events/event.routes"));
  app.use("/api/tickets", require("../modules/tickets/ticket.routes"));
  app.use("/api/bookings", require("../modules/bookings/booking.routes"));

  // Organizations
  app.use(
    "/api/organizations",
    require("../modules/organisations/organization.routes")
  );

  app.use(
    "/api/organization-members",
    require("../modules/organisationMembers/organisationMember.routes")
  );

  // Dashboard
  app.use("/api/dashboard", require("../modules/dashboard/dashboard.routes"));

  // Analytics (ONLY ONCE)
  app.use("/api/analytics", require("../modules/analytics/analytics.routes"));
};
