export const loginAsOrganizer = () => {
  localStorage.setItem("userId", "organizer_001");
  localStorage.setItem("role", "organizer");

  // 🔑 REQUIRED for organizer routes
  localStorage.setItem("organizationId", "org_001");
};
