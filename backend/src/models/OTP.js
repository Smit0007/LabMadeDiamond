const mongoose = require("mongoose");

const otpSchema =
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      otp: {
        type: String,
        required: true,
      },

      purpose: {
        type: String,
        enum: [
          "register",
          "reset-password",
          "forgot-password",
        ],
        required: true,
      },

      attempts: {
        type: Number,
        default: 0,
      },

      verified: {
        type: Boolean,
        default: false,
      },

      expiresAt: {
        type: Date,
        default: () =>
          new Date(
            Date.now() + 5 * 60 * 1000
          ),
        expires: 0,
      },
      verifiedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "OTP",
    otpSchema
  );