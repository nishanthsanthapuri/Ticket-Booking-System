/**
 * Safe async wrapper for external / risky calls
 * Ensures system never crashes due to dependency failure
 */
const safeAsync = async (fn, fallback = null, label = "SAFE_ASYNC") => {
  try {
    return await fn();
  } catch (error) {
    console.error(`🛑 ${label} failed:`, error.message);
    return fallback;
  }
};

module.exports = { safeAsync };
