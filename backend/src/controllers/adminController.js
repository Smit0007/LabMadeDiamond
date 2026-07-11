const Inventory = require(
  "../models/Inventory"
);

const InventoryFile = require(
  "../models/InventoryFile"
);

const bcrypt =
  require("bcryptjs");

const mongoose =
  require("mongoose");

const Admin =
  require("../models/Admin");

const User =
  require("../models/User");

const generateToken =
  require("../utils/generateToken");

const QuoteRequest =
  require("../models/QuoteRequest");

/*
|--------------------------------------------------------------------------
| Admin Login
|--------------------------------------------------------------------------
*/

exports.adminLogin = async (
  req,
  res
) => {
  try {

    const {
      email,
      password,
    } = req.body;

    // ----------------------------
    // NoSQL Injection Protection
    // ----------------------------

    if (
      typeof email !== "string" ||
      typeof password !== "string"
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

    const admin =
      await Admin.findOne({
        email:
          cleanEmail,
      });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    const token =
      generateToken(
        admin._id
      );

    res.json({
      success: true,
      token,
      admin: {
        id:
          admin._id,
        name:
          admin.name,
        email:
          admin.email,
        role:
          admin.role,
      },
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
| Get All Users
|--------------------------------------------------------------------------
*/

exports.getUsers = async (
  req,
  res
) => {
  try {

    const users =
      await User.find()
        .select(
          "-password -__v"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      count:
        users.length,
      users,
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
| Approve User
|--------------------------------------------------------------------------
*/

exports.approveUser = async (
  req,
  res
) => {
  try {

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid user ID",
      });
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          status:
            "approved",
        },
        {
          new: true,
          runValidators: true,
        }
      ).select(
        "-password -__v"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    res.json({
      success: true,
      message:
        "User approved successfully",
      user,
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
| Reject User
|--------------------------------------------------------------------------
*/

exports.rejectUser = async (
  req,
  res
) => {
  try {

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid user ID",
      });
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          status:
            "rejected",
        },
        {
          new: true,
          runValidators: true,
        }
      ).select(
        "-password -__v"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    res.json({
      success: true,
      message:
        "User rejected successfully",
      user,
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
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

exports.getAdminStats =
  async (req, res) => {
    try {

      const [
        totalUsers,
        approvedUsers,
        pendingUsers,
        inventoryRecords,
        uploadedFiles,
        quoteRequests,
      ] = await Promise.all([

        User.countDocuments(),

        User.countDocuments({
          status:
            "approved",
        }),

        User.countDocuments({
          status:
            "pending",
        }),

        Inventory.countDocuments(),

        InventoryFile.countDocuments(),

        QuoteRequest.countDocuments(),

      ]);

      res.json({
        success: true,
        totalUsers,
        approvedUsers,
        pendingUsers,
        inventoryRecords,
        uploadedFiles,
        quoteRequests,
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
| Get Quote Details
|--------------------------------------------------------------------------
*/

exports.getQuoteById =
  async (req, res) => {
    try {

      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid quote ID",
        });
      }

      const quote =
        await QuoteRequest.findById(
          req.params.id
        ).populate(
          "userId",
          "-password -__v"
        );

      if (!quote) {
        return res.status(404).json({
          success: false,
          message:
            "Quote not found",
        });
      }

      const detailedItems = [];

      for (const item of quote.items) {

        const inventory =
          await Inventory.findById(
            item.inventoryId
          )
            .select("-__v")
            .populate(
              "sourceFileId"
            );

        if (!inventory)
          continue;

        detailedItems.push({

          quantity:
            item.quantity,

          fileName:
            inventory
              .sourceFileId
              ?.filename,

          originalStoneId:
            inventory.fields[
              "Orginal Stone ID"
            ],

          stoneId:
            inventory.fields[
              "Stone Id"
            ],

          stoneNetAmt:
            inventory.fields[
              "Stone Net Amt"
            ],

          inventory,

        });

      }

      res.json({
        success: true,
        quote,
        items:
          detailedItems,
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
| Update Quote Status
|--------------------------------------------------------------------------
*/

exports.updateQuoteStatus =
  async (req, res) => {
    try {

      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid quote ID",
        });
      }

      const allowedStatus = [
        "new",
        "contacted",
        "quoted",
        "closed",
      ];

      if (
        !allowedStatus.includes(
          req.body.status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status",
        });
      }

      const quote =
        await QuoteRequest.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!quote) {
        return res.status(404).json({
          success: false,
          message:
            "Quote not found",
        });
      }

      res.json({
        success: true,
        message:
          "Quote status updated",
        quote,
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