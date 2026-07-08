const express =
  require("express");

const {
  loginLimiter,
} = require(
  "../middleware/rateLimiter"
);

const {
  sendOTP,
  verifyOTP,
} = require(
  "../controllers/otpController"
);

const router =
  express.Router();

router.post(
  "/send",
  loginLimiter,
  sendOTP
);

router.post(
  "/verify",
  loginLimiter,
  verifyOTP
);

module.exports =
  router;