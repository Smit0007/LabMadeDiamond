const bcrypt = require("bcryptjs");

const OTP = require("../models/OTP");

const {
  sendEmail,
} = require("../config/mail");

const OTP_EXPIRY_MINUTES = 5;
const RESEND_SECONDS = 60;
const MAX_ATTEMPTS = 5;

function generateOTP() {
  return Math.floor(
    100000 +
      Math.random() * 900000
  ).toString();
}

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

exports.sendOTP =
  async (req, res) => {
    try {

      const {
        email,
        purpose,
      } = req.body;

      if (
        typeof email !==
          "string" ||
        typeof purpose !==
          "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid input",
        });
      }

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const existing =
        await OTP.findOne({
          email:
            cleanEmail,
          purpose,
        });

      if (existing) {

        const seconds =
          (
            Date.now() -
            existing.createdAt.getTime()
          ) / 1000;

        if (
          seconds <
          RESEND_SECONDS
        ) {
          return res.status(429).json({
            success: false,
            message:
              `Wait ${Math.ceil(
                RESEND_SECONDS -
                  seconds
              )} seconds before requesting another OTP.`,
          });
        }

        await OTP.deleteOne({
          _id:
            existing._id,
        });

      }

      const otp =
        generateOTP();

      const hashedOTP =
        await bcrypt.hash(
          otp,
          10
        );

      await OTP.create({
        email:
          cleanEmail,
        otp:
          hashedOTP,
        purpose,
        expiresAt:
          new Date(
            Date.now() +
              OTP_EXPIRY_MINUTES *
                60 *
                1000
          ),
      });

      await sendEmail({
        to:
          cleanEmail,
        subject:
          "Diamond Portal OTP Verification",

        text:
          `Your OTP is ${otp}. It is valid for ${OTP_EXPIRY_MINUTES} minutes.`,

        html: `
          <div style="font-family:Arial,sans-serif">

          <h2>Email Verification</h2>

          <p>Your verification code is:</p>

          <h1>${otp}</h1>

          <p>
          This OTP will expire in
          ${OTP_EXPIRY_MINUTES}
          minutes.
          </p>

          </div>
        `,
      });

      res.json({
        success: true,
        message:
          "OTP sent successfully.",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

exports.verifyOTP =
  async (req, res) => {

    try {

      const {
        email,
        otp,
        purpose,
      } = req.body;

      const record =
        await OTP.findOne({
          email:
            email
              .trim()
              .toLowerCase(),
          purpose,
        });

      if (!record) {
        return res.status(404).json({
          success: false,
          message:
            "OTP not found",
        });
      }

      if (
        record.attempts >=
        MAX_ATTEMPTS
      ) {

        await OTP.deleteOne({
          _id:
            record._id,
        });

        return res.status(429).json({
          success: false,
          message:
            "Maximum attempts exceeded.",
        });

      }

      record.attempts++;

      await record.save();

      const match =
        await bcrypt.compare(
          otp,
          record.otp
        );

      if (!match) {

        return res.status(400).json({
          success: false,
          message:
            "Incorrect OTP",
        });

      }

        record.verified = true;
        record.verifiedAt = new Date();

        await record.save();

      res.json({
        success: true,
        message:
          "OTP verified successfully.",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };