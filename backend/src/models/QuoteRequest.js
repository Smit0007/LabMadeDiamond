const mongoose = require("mongoose");

const quoteRequestSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
      },

      items: [
        {
          inventoryId: {
            type:
              mongoose.Schema.Types
                .ObjectId,
            ref: "Inventory",
            required: true,
          },

          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],

      totalItems: {
        type: Number,
        required: true,
      },

      notes: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "new",
          "contacted",
          "quoted",
          "closed",
        ],
        default: "new",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "QuoteRequest",
    quoteRequestSchema
  );