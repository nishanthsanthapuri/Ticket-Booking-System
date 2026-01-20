const crypto = require("crypto");

module.exports.generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
