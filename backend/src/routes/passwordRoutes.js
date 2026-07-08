const express = require("express");

const {
  sendResetOTP,
  verifyResetOTP,
  resetPassword,
  changePassword,
} = require(
  "../controllers/passwordController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  loginLimiter,
} = require(
  "../middleware/rateLimiter"
);

const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/

router.post(
  "/send-otp",
  loginLimiter,
  sendResetOTP
);

router.post(
  "/verify-otp",
  loginLimiter,
  verifyResetOTP
);

router.post(
  "/reset",
  loginLimiter,
  resetPassword
);

/*
|--------------------------------------------------------------------------
| Logged In User
|--------------------------------------------------------------------------
*/

router.post(
  "/change",
  authMiddleware,
  changePassword
);

module.exports =
  router;