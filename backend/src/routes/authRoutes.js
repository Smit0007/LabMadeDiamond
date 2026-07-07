const express = require(
  "express"
);

const {
  registerUser,
  loginUser,
  getMe,
} = require(
  "../controllers/authController"
);

const {
  loginLimiter,
} = require(
  "../middleware/rateLimiter"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const router =
  express.Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginLimiter,
  loginUser
);

router.get(
  "/me",
  authMiddleware,
  getMe
);

module.exports = router;