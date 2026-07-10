const XLSX = require("xlsx");
const mongoose = require("mongoose");

const Inventory = require("../models/Inventory");
const InventoryFile = require("../models/InventoryFile");

/*
|--------------------------------------------------------------------------
| Upload Limits
|--------------------------------------------------------------------------
*/

const MAX_ROWS = 10000;
const MAX_COLUMNS = 100;

const ALLOWED_CATEGORIES = [
  "all",
  "cvd-certified",
  "cvd-non-certified",
  "wholesale-melee",
];

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function sanitizeHeader(header) {
  return String(header)
    .replace(/<[^>]*>/g, "")
    .trim();
}

function sanitizeValue(value) {

  if (typeof value !== "string")
    return value;

  value = value.trim();

  // Formula Injection Protection
  if (/^[=+\-@]/.test(value)) {
    value = "'" + value;
  }

  // Remove HTML
  value = value.replace(
    /<[^>]*>/g,
    ""
  );

  return value;
}

/*
|--------------------------------------------------------------------------
| Upload Inventory
|--------------------------------------------------------------------------
*/

exports.uploadInventory =
  async (req, res) => {



    try {

      const {
        category,
      } = req.body;

      if (
        typeof category !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid category",
        });
      }

      if (
        !ALLOWED_CATEGORIES.includes(
          category
        )
      ) {



        return res.status(400).json({
          success: false,
          message:
            "Unknown inventory category",
        });

      }

      if (!req.file) {


        return res.status(400).json({
          success: false,
          message:
            "No file uploaded",
        });

      }

      if (
        req.file.size === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Uploaded file is empty.",
        });
      }




      const duplicate =
        await InventoryFile.findOne({
          filename:
            req.file.originalname,
          category,
        });

      if (duplicate) {



        return res.status(409).json({
          success: false,
          message:
            "File already uploaded",
        });

      }

      let workbook;

      try {

        workbook =
          XLSX.read(
            req.file.buffer,
            {
              type:
                "buffer",
            }
          );

      } catch {



        return res.status(400).json({
          success: false,
          message:
            "Invalid Excel file",
        });

      }

      if (
        workbook.SheetNames.length === 0
      ) {



        return res.status(400).json({
          success: false,
          message:
            "Workbook is empty",
        });

      }

      const sheet =
        workbook.Sheets[
          workbook.SheetNames[0]
        ];

      const rows =
        XLSX.utils.sheet_to_json(
          sheet,
          {
            defval: "",
          }
        );

      if (
        rows.length === 0
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Spreadsheet is empty",
        });

      }

      if (
        rows.length >
        MAX_ROWS
      ) {


        return res.status(400).json({
          success: false,
          message:
            `Maximum ${MAX_ROWS} rows allowed.`,
        });

      }

      const headers =
        Object.keys(rows[0]);

      if (
        headers.length >
        MAX_COLUMNS
      ) {


        return res.status(400).json({
          success: false,
          message:
            `Maximum ${MAX_COLUMNS} columns allowed.`,
        });

      }

      /*
      |--------------------------------------------------------------------------
      | Sanitize Headers
      |--------------------------------------------------------------------------
      */

      const sanitizedHeaders =
        headers.map(
          sanitizeHeader
        );

      /*
      |--------------------------------------------------------------------------
      | Sanitize Rows
      |--------------------------------------------------------------------------
      */

      const inventoryRows =
        rows.map(
          (row) => {

            const cleanedRow =
              {};

            sanitizedHeaders.forEach(
              (
                header,
                index
              ) => {

                const originalKey =
                  headers[index];

                cleanedRow[
                  header
                ] =
                  sanitizeValue(
                    row[
                      originalKey
                    ]
                  );

              }
            );

            return {
              category,
              sourceFileId:
                null,
              fields:
                cleanedRow,
            };

          }
        );

      /*
      |--------------------------------------------------------------------------
      | Save Inventory File
      |--------------------------------------------------------------------------
      */

      const inventoryFile =
        await InventoryFile.create({
          filename:
            req.file.originalname,
          category,
          totalRows:
            inventoryRows.length,
        });

      /*
      |--------------------------------------------------------------------------
      | Attach Source File
      |--------------------------------------------------------------------------
      */

      inventoryRows.forEach(
        (row) => {
          row.sourceFileId =
            inventoryFile._id;
        }
      );

      /*
      |--------------------------------------------------------------------------
      | Bulk Insert
      |--------------------------------------------------------------------------
      */
      try {

        await Inventory.insertMany(
          inventoryRows,
          {
            ordered: false,
          }
        );

      } catch (error) {

        await InventoryFile.findByIdAndDelete(
          inventoryFile._id
        );

        throw error;

      }

      /*
      |--------------------------------------------------------------------------
      | Commit
      |--------------------------------------------------------------------------
      */



      return res.json({
        success: true,
        fileId:
          inventoryFile._id,
        rowsImported:
          inventoryRows.length,
      });

    } catch (error) {



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
| Delete Inventory File
|--------------------------------------------------------------------------
*/

exports.deleteInventoryFile =
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
            "Invalid file ID",
        });

      }

      const file =
        await InventoryFile.findById(
          req.params.id
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
            file._id,
        });

        await InventoryFile.findByIdAndDelete(
          file._id
        );


      return res.json({
        success: true,
        message:
          "Inventory file deleted successfully",
        rowsDeleted:
          deletedRows.deletedCount,
      });

    } catch (error) {



      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };