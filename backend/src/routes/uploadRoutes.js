const express = require(
  "express"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

const adminAuth =
  require(
    "../middleware/adminAuthMiddleware"
  );

const {
  uploadInventory,
  deleteInventoryFile,
} = require(
  "../controllers/uploadController"
);

const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| Admin Only
|--------------------------------------------------------------------------
*/

router.post(
  "/inventory",
  adminAuth,
  upload.single("file"),
  uploadInventory
);

router.delete(
  "/inventory-files/:id",
  adminAuth,
  deleteInventoryFile
);

module.exports = router;