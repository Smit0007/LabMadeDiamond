const bcrypt = require("bcryptjs");

const User = require("../models/User");
const OTP = require("../models/OTP");

const {
  sendEmail,
} = require("../config/mail");

const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 5;

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function generateOTP() {

  return Math.floor(

    100000 +

    Math.random() * 900000

  ).toString();

}

/*
|--------------------------------------------------------------------------
| Send Reset Password OTP
|--------------------------------------------------------------------------
*/

exports.sendResetOTP =
  async (req, res) => {

    try {

      const {
        email,
      } = req.body;

      if (
        typeof email !== "string"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid email.",

        });

      }

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const user =
        await User.findOne({

          email:
            cleanEmail,

        });

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "Account not found.",

        });

      }

      await OTP.deleteMany({

        email:
          cleanEmail,

        purpose:
          "reset-password",

      });

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

        purpose:
          "reset-password",

      });

      await sendEmail({

        to:
          cleanEmail,

        subject:
          "Diamond Portal Password Reset OTP",

        text:
          `Your OTP is ${otp}. It is valid for ${OTP_EXPIRY_MINUTES} minutes.`,

        html: `

          <div style="font-family:Arial,sans-serif">

            <h2>Password Reset</h2>

            <p>Your password reset code is:</p>

            <h1>${otp}</h1>

            <p>

              This OTP expires in
              ${OTP_EXPIRY_MINUTES}
              minutes.

            </p>

          </div>

        `,

      });

      return res.json({

        success: true,

        message:
          "OTP sent successfully.",

      });

    }

    catch (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };


/*
|--------------------------------------------------------------------------
| Verify Reset OTP
|--------------------------------------------------------------------------
*/

exports.verifyResetOTP =
  async (req, res) => {

    try {

      const {
        email,
        otp,
      } = req.body;

      if (
        typeof email !== "string" ||
        typeof otp !== "string"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid request.",

        });

      }

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const otpDoc =
        await OTP.findOne({

          email:
            cleanEmail,

          purpose:
            "reset-password",

        });

      if (!otpDoc) {

        return res.status(404).json({

          success: false,

          message:
            "OTP not found.",

        });

      }

      if (
        otpDoc.attempts >=
        MAX_ATTEMPTS
      ) {

        await OTP.deleteOne({
          _id:
            otpDoc._id,
        });

        return res.status(429).json({

          success: false,

          message:
            "Maximum OTP attempts exceeded.",

        });

      }

      otpDoc.attempts++;

      await otpDoc.save();

      const match =
        await bcrypt.compare(
          otp,
          otpDoc.otp
        );

      if (!match) {

        return res.status(400).json({

          success: false,

          message:
            "Incorrect OTP.",

        });

      }

      otpDoc.verified =
        true;

      otpDoc.verifiedAt =
        new Date();

      await otpDoc.save();

      return res.json({

        success: true,

        message:
          "OTP verified successfully.",

      });

    }

    catch (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/

exports.resetPassword =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      if (
        typeof email !== "string" ||
        typeof password !== "string"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid request.",

        });

      }

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const verifiedOTP =
        await OTP.findOne({

          email:
            cleanEmail,

          purpose:
            "reset-password",

          verified:
            true,

        });

      if (!verifiedOTP) {

        return res.status(403).json({

          success: false,

          message:
            "Verify OTP first.",

        });

      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      if (
        !passwordRegex.test(
          password
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Password does not meet security requirements.",

        });

      }

      const user =
        await User.findOne({

          email:
            cleanEmail,

        });

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found.",

        });

      }

      const samePassword =
        await bcrypt.compare(

          password,

          user.password

        );

      if (samePassword) {

        return res.status(400).json({

          success: false,

          message:
            "New password must be different from the current password.",

        });

      }

      user.password =
        await bcrypt.hash(
          password,
          12
        );

      await user.save();

      await OTP.deleteMany({

        email:
          cleanEmail,

        purpose:
          "reset-password",

      });

      return res.json({

        success: true,

        message:
          "Password reset successful.",

      });

    }

    catch (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };
/*
|--------------------------------------------------------------------------
| Change Password (Logged In User)
|--------------------------------------------------------------------------
*/

exports.changePassword =
  async (req, res) => {

    try {

      const {
        currentPassword,
        newPassword,
      } = req.body;

      if (
        typeof currentPassword !== "string" ||
        typeof newPassword !== "string"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid request.",

        });

      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      if (
        !passwordRegex.test(
          newPassword
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Password does not meet security requirements.",

        });

      }

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found.",

        });

      }

      const currentMatches =
        await bcrypt.compare(

          currentPassword,

          user.password

        );

      if (!currentMatches) {

        return res.status(400).json({

          success: false,

          message:
            "Current password is incorrect.",

        });

      }

      const samePassword =
        await bcrypt.compare(

          newPassword,

          user.password

        );

      if (samePassword) {

        return res.status(400).json({

          success: false,

          message:
            "New password must be different from your current password.",

        });

      }

      user.password =
        await bcrypt.hash(

          newPassword,

          12

        );

      await user.save();

      return res.json({

        success: true,

        message:
          "Password changed successfully.",

      });

    }

    catch (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message:
          "Internal server error.",

      });

    }

  };