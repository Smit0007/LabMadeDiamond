const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    sourceFileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InventoryFile",
      required: true,
    },

    fields: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Inventory",
  inventorySchema
);