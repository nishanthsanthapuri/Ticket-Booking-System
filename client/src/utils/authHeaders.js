export const authHeaders = () => {
  return {
    "x-user-id": localStorage.getItem("userId"),
    "x-role": localStorage.getItem("role"),
    "x-organization-id": localStorage.getItem("organizationId"),
  };
};
