const redis = require("../config/redis");

const LOCK_TTL_SECONDS = 300; // 5 minutes

const acquireTicketLock = async (ticketId, userId) => {
  try {
    const lockKey = `lock:ticket:${ticketId}`;

    const acquired = await redis.set(
      lockKey,
      userId,
      "NX",
      "EX",
      LOCK_TTL_SECONDS
    );

    return acquired === "OK";
  } catch (err) {
    console.warn("⚠️ Redis unavailable — running without lock");
    return true; // graceful fallback
  }
};

const releaseTicketLock = async (ticketId) => {
  try {
    const lockKey = `lock:ticket:${ticketId}`;
    await redis.del(lockKey);
  } catch (err) {
    console.warn("⚠️ Redis unavailable — lock release skipped");
  }
};

module.exports = {
  acquireTicketLock,
  releaseTicketLock,
};
