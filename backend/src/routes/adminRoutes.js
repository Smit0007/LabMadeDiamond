const express = require("express");

const adminAuth =
  require("../middleware/adminAuthMiddleware");

const {
  adminLogin,
  getUsers,
  approveUser,
  rejectUser,
  getAdminStats,
  getQuoteById,
  updateQuoteStatus,
} = require("../controllers/adminController");

const router = express.Router();

const {
  adminLoginLimiter,
} = require(
  "../middleware/rateLimiter"
);

// Public
router.post(
  "/login",
  adminLoginLimiter,
  adminLogin
);

// Protected
router.get(
  "/stats",
  adminAuth,
  getAdminStats
);

router.get(
  "/users",
  adminAuth,
  getUsers
);

router.patch(
  "/users/:id/approve",
  adminAuth,
  approveUser
);

router.patch(
  "/users/:id/reject",
  adminAuth,
  rejectUser
);

router.get(
  "/quotes/:id",
  adminAuth,
  getQuoteById
);

router.patch(
  "/quotes/:id/status",
  adminAuth,
  updateQuoteStatus
);

module.exports = router;