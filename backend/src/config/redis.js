// const Redis = require("ioredis");

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
//   retryStrategy(times) {
//     return Math.min(times * 50, 2000);
//   },
// });

// redis.on("connect", () => {
//   console.log("✅ Redis connected");
// });

// redis.on("error", (err) => {
//   console.error("❌ Redis error", err);
// });

// module.exports = redis;
// // This file configures and exports a Redis client using the ioredis library.
const Redis = require("ioredis");

if (!process.env.REDIS_URL) {
  throw new Error("❌ REDIS_URL is not defined in environment variables");
}

const redis = new Redis(process.env.REDIS_URL, {
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});

redis.on("connect", () => {
  console.log("✅ Redis connected to cloud");
});

redis.on("error", (err) => {
  console.error("❌ Redis error", err);
});

module.exports = redis;
