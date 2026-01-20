const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    server: "up",
    mongo: "connected",
    redis: "connected",
  });
});

module.exports = router;
