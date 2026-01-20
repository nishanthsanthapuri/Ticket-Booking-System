const AuditLog = require("./auditLog.model");

/**
 * Create an audit log entry
 */
const createAuditLog = async ({
  action,
  entityType,
  entityId,
  performedBy,
  role,
  metadata = {},
}) => {
  return AuditLog.create({
    action,
    entityType,
    entityId,
    performedBy,
    role,
    metadata,
  });
};

module.exports = {
  createAuditLog,
};
