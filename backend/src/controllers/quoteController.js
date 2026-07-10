const QuoteRequest =
  require("../models/QuoteRequest");

const Inventory =
  require("../models/Inventory");

const InventoryFile =
  require("../models/InventoryFile");

exports.createQuoteRequest =
  async (req, res) => {
    try {
      const {
        items,
        notes,
      } = req.body;

      const totalItems =
        items.reduce(
          (sum, item) =>
            sum +
            Number(
              item.quantity
            ),
          0
        );

      if (
        totalItems < 10
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Minimum 10 stones required",
        });
      }

      const quote =
        await QuoteRequest.create({
          userId:
            req.user.id,
          items,
          totalItems,
          notes,
        });

      res.status(201).json({
        success: true,
        quote,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

exports.getQuoteRequests =
  async (req, res) => {
    try {
      const quotes =
        await QuoteRequest.find()
          .populate(
            "userId",
            "-password"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        count:
          quotes.length,
        quotes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

exports.getQuoteRequestById =
  async (req, res) => {
    try {
      const quote =
        await QuoteRequest.findById(
          req.params.id
        ).populate(
          "userId",
          "-password"
        );

      if (!quote) {
        return res.status(404).json({
          success: false,
          message:
            "Quote not found",
        });
      }


      // Prevent users from viewing other users' quotes
      if (
        quote.userId._id.toString() !==
        req.user.id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not authorized to access this quotation",
        });
      }

      

      const detailedItems =
        [];

      for (const item of quote.items) {
        const inventory =
          await Inventory.findById(
            item.inventoryId
          ).populate(
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
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

exports.updateQuoteStatus =
  async (req, res) => {
    try {
      const quote =
        await QuoteRequest.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
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
        quote,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

exports.getMyRequests =
  async (req, res) => {
    try {

      const requests =
        await QuoteRequest.find({
          userId:
            req.user.id,
        })
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        count:
          requests.length,
        requests,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };