export const loginAsStaff = () => {
  localStorage.setItem("userId", "staff_001");
  localStorage.setItem("role", "staff");
  localStorage.setItem("organizationId", "ORG_DEMO");
};
