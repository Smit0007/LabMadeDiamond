const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const MAX_FILE_SIZE =
  10 * 1024 * 1024; // 10 MB

const allowedMimeTypes = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "application/csv",
  "application/octet-stream",
];

const allowedExtensions = [
  ".xls",
  ".xlsx",
  ".csv",
];

const upload = multer({

  storage,

  limits: {
    fileSize:
      MAX_FILE_SIZE,
  },

  fileFilter: (
    req,
    file,
    cb
  ) => {

    if (
      !file.originalname
    ) {
      return cb(
        new Error(
          "Invalid file."
        )
      );
    }

    if (
      file.originalname.length >
      255
    ) {
      return cb(
        new Error(
          "Filename is too long."
        )
      );
    }

    const extension =
      path
        .extname(
          file.originalname
        )
        .toLowerCase();

    if (!extension) {
      return cb(
        new Error(
          "File extension missing."
        )
      );
    }

    const validExtension =
      allowedExtensions.includes(
        extension
      );

    const validMime =
      allowedMimeTypes.includes(
        file.mimetype
      );

    if (
      !validExtension ||
      !validMime
    ) {
      return cb(
        new Error(
          "Only .xls, .xlsx and .csv files are allowed."
        )
      );
    }

    cb(
      null,
      true
    );

  },

});

module.exports =
  upload;