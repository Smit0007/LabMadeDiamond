const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./src/models/Admin");

async function createAdmin() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    await Admin.create({
      name: "Admin",
      email: "admin1@diamond.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log(
      "Admin created successfully"
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();