const bcrypt = require("bcryptjs");

const User = require("../models/User");
const OTP = require("../models/OTP");

const generateToken = require(
  "../utils/generateToken"
);

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

exports.registerUser = async (
  req,
  res
) => {
  try {

    const {
      fullName,
      companyName,
      email,
      phone,
      country,
      businessType,
      password,
    } = req.body;

    // ----------------------------
    // Validate Types
    // ----------------------------

    const fields = [
      fullName,
      companyName,
      email,
      phone,
      country,
      businessType,
      password,
    ];

    if (
      fields.some(
        (field) =>
          typeof field !== "string"
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input.",
      });
    }

    // ----------------------------
    // Sanitize Inputs
    // ----------------------------

    const cleanFullName =
      fullName.trim();

    const cleanCompanyName =
      companyName.trim();

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    const cleanPhone =
      phone.trim();

    const cleanCountry =
      country.trim();

    const cleanBusinessType =
      businessType.trim();

    // ----------------------------
    // Password Policy
    // ----------------------------

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
          "Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character.",
      });
    }

    // ----------------------------
    // OTP Verification
    // ----------------------------

    const verifiedOTP =
      await OTP.findOne({
        email:
          cleanEmail,
        purpose:
          "register",
        verified:
          true,
        expiresAt: {
          $gt:
            new Date(),
        },
      });

    if (!verifiedOTP) {
      return res.status(403).json({
        success: false,
        message:
          "Verify your email before registering.",
      });
    }

    // ----------------------------
    // Existing User
    // ----------------------------

    const existingUser =
      await User.findOne({
        email:
          cleanEmail,
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "User already exists.",
      });
    }

    // ----------------------------
    // Hash Password
    // ----------------------------

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    // ----------------------------
    // Create User
    // ----------------------------

    const user =
      await User.create({
        fullName:
          cleanFullName,
        companyName:
          cleanCompanyName,
        email:
          cleanEmail,
        phone:
          cleanPhone,
        country:
          cleanCountry,
        businessType:
          cleanBusinessType,
        password:
          hashedPassword,
        status:
          "pending",
      });

    // ----------------------------
    // Delete Used OTP
    // ----------------------------

    await OTP.deleteMany({
      email:
        cleanEmail,
      purpose:
        "register",
    });

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Awaiting admin approval.",
      userId:
        user._id,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Internal server error.",
    });

  }
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

exports.loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // ----------------------------
    // Validate Input Types
    // ----------------------------

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid input.",
      });
    }

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    // ----------------------------
    // Find User
    // ----------------------------

    const user =
      await User.findOne({
        email:
          cleanEmail,
      });

    if (!user) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });

    }

    // ----------------------------
    // Compare Password
    // ----------------------------

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });

    }

    // ----------------------------
    // Account Status
    // ----------------------------

    switch (
      user.status
    ) {

      case "pending":

        return res.status(403).json({
          success: false,
          message:
            "Your account is awaiting admin approval.",
        });

      case "rejected":

        return res.status(403).json({
          success: false,
          message:
            "Your account has been rejected.",
        });

      case "approved":
        break;

      default:

        return res.status(403).json({
          success: false,
          message:
            "Account unavailable.",
        });

    }

    // ----------------------------
    // Generate JWT
    // ----------------------------

    const token =
      generateToken(
        user._id
      );

    // ----------------------------
    // Success
    // ----------------------------

    return res.json({
      success: true,

      token,

      user: {

        id:
          user._id,

        fullName:
          user.fullName,

        companyName:
          user.companyName,

        email:
          user.email,

        phone:
          user.phone,

        country:
          user.country,

        businessType:
          user.businessType,

        status:
          user.status,

        createdAt:
          user.createdAt,

      },

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Internal server error.",
    });

  }

};   

/*
|--------------------------------------------------------------------------
| Get Current User
|--------------------------------------------------------------------------
*/

exports.getMe = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select(
        "-password -__v"
      );

    if (!user) {

      return res.status(404).json({
        success: false,
        message:
          "User not found.",
      });

    }

    return res.status(200).json({

      success: true,

      user: {

        id:
          user._id,

        fullName:
          user.fullName,

        companyName:
          user.companyName,

        email:
          user.email,

        phone:
          user.phone,

        country:
          user.country,

        businessType:
          user.businessType,

        status:
          user.status,

        createdAt:
          user.createdAt,

        updatedAt:
          user.updatedAt,

      },

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Internal server error.",
    });

  }

};

