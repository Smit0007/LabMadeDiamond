const mongoose = require("mongoose");

const inventoryFileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "cvd-certified",
        "cvd-non-certified",
        "wholesale-melee",
        "all",
      ],
    },

    totalRows: {
      type: Number,
      default: 0,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InventoryFile",
  inventoryFileSchema
);