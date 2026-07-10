const express = require("express");

const {
  getInventoryByCategory,
  getInventoryRecord,
  getFiles,
  deleteFile,
  getFilterOptions,
} = require("../controllers/inventoryController");

const authMiddleware =
  require("../middleware/authMiddleware");

const adminAuth =
  require("../middleware/adminAuthMiddleware");

const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| Admin Only
|--------------------------------------------------------------------------
*/

router.get(
  "/files",
  adminAuth,
  getFiles
);

router.delete(
  "/files/:fileId",
  adminAuth,
  deleteFile
);

/*
|--------------------------------------------------------------------------
| Approved Customers
|--------------------------------------------------------------------------
*/

router.get(
  "/filters/:category",
  authMiddleware,
  getFilterOptions
);

router.get(
  "/:category",
  authMiddleware,
  getInventoryByCategory
);

router.get(
  "/record/:id",
  authMiddleware,
  getInventoryRecord
);

module.exports = router;