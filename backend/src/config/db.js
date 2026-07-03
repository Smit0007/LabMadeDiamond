const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Attempting MongoDB connection...");
  console.log(
    "MONGODB_URI:",
    process.env.MONGODB_URI
  );

  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(
      "MongoDB Connection Error:"
    );

    console.error(error);

    process.exit(1);
  }
};

module.exports = connectDB;