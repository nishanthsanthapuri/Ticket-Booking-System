const redis = require("../config/redis");

/**
 * Generic rate limiter using Redis
 * @param {Object} options
 */
const rateLimit = ({ keyPrefix, limit, windowSeconds }) => {
  return async (req, res, next) => {
    try {
      const identifier = req.headers["x-user-id"] || req.ip || "anonymous";

      const redisKey = `${keyPrefix}:${identifier}`;

      const current = await redis.incr(redisKey);

      // First hit → set expiry
      if (current === 1) {
        await redis.expire(redisKey, windowSeconds);
      }

      if (current > limit) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      }

      next();
    } catch (err) {
      console.error("Rate limit error:", err.message);
      // Fail-safe: do NOT block traffic if Redis fails
      next();
    }
  };
};

module.exports = { rateLimit };
