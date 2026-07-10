const Inventory = require(
  "../models/Inventory"
);

const InventoryFile = require(
  "../models/InventoryFile"
);

const mongoose =
  require("mongoose");

exports.getFilterOptions =
  async (req, res) => {
    try {

      const inventory =
        await Inventory.find({
          category:
            req.params.category,
        });

      const FILTER_FIELDS = [
        "Shape",
        "Color",
        "Clarity",
        "Cut",
        "Polish",
        "Symm",
        "Fluorescence",
      ];

      const filters = {};

      FILTER_FIELDS.forEach(
        (field) => {

          const values =
            [
              ...new Set(
                inventory
                  .map(
                    (item) =>
                      item.fields[
                        field
                      ]
                  )
                  .filter(
                    Boolean
                  )
              ),
            ].sort();

          if (
            values.length
          ) {
            filters[
              field
            ] = values;
          }
        }
      );

      res.json({
        success: true,
        filters,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

exports.getInventoryByCategory =
  async (req, res) => {
    try {

      const page =
        parseInt(req.query.page) || 1;

      const limit =
        parseInt(req.query.limit) || 25;

      const skip =
        (page - 1) * limit;

      const query = {
        category:
          req.params.category,
      };

      const FILTER_FIELDS = [
        "Shape",
        "Color",
        "Clarity",
        "Cut",
        "Polish",
        "Symm",
        "Fluorescence",
      ];

      FILTER_FIELDS.forEach(
        (field) => {

          const key =
            field.toLowerCase();

          if (
            typeof req.query[key] === "string"
          ) {

            const values =
              req.query[key]
                .split(",");

            query[
              `fields.${field}`
            ] = {
              $in: values,
            };

          }

        }
      );

      const total =
        await Inventory.countDocuments(
          query
        );

      const inventory =
        await Inventory.find(query)
          .select(
            "-__v"
          )
          .skip(skip)
          .limit(limit);

      res.json({
        success: true,
        page,
        limit,
        total,
        pages: Math.ceil(
          total / limit
        ),
        inventory,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

exports.getInventoryRecord =
  async (req, res) => {
    try {
      

      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid inventory ID",
        });
      }
      const record =
        await Inventory.findById(
          req.params.id
        ).select(
          "-__v"
        );

      if (!record) {
        return res.status(404).json({
          success: false,
          message:
            "Record not found",
        });
      }

      res.json({
        success: true,
        record,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

exports.getFiles =
  async (req, res) => {
    try {

      const files =
        await InventoryFile.find()
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        count:
          files.length,
        files,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

exports.deleteFile =
  async (req, res) => {
    try {

      const fileId =
        req.params.fileId;

      const file =
        await InventoryFile.findById(
          fileId
        );

      if (!file) {
        return res.status(404).json({
          success: false,
          message:
            "File not found",
        });
      }

      const deletedRows =
        await Inventory.deleteMany({
          sourceFileId:
            fileId,
        });

      await InventoryFile.findByIdAndDelete(
        fileId
      );

      res.json({
        success: true,
        message:
          "File deleted",
        rowsDeleted:
          deletedRows.deletedCount,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };