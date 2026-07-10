const express =
  require("express");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  createQuoteRequest,
  getQuoteRequests,
  getQuoteRequestById,
  updateQuoteStatus,
  getMyRequests,
} = require(
  "../controllers/quoteController"
);

const router =
  express.Router();

const adminAuth =
require("../middleware/adminAuthMiddleware");

router.post(
  "/",
  authMiddleware,
  createQuoteRequest
);

router.get(
  "/",
  adminAuth,
  getQuoteRequests
);

router.get(
  "/my-requests",
  authMiddleware,
  getMyRequests
);

router.get(
  "/:id",
  authMiddleware,
  getQuoteRequestById
);




module.exports =
  router;