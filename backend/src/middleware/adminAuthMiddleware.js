const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

module.exports = async (req, res, next) => {
  try {
    console.log("\n========== ADMIN AUTH ==========");

    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    console.log("DECODED:", decoded);

    const admin = await Admin.findById(decoded.id).select("-password");

    console.log("ADMIN FROM DB:", admin);

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    req.admin = admin;

    console.log("ADMIN AUTH SUCCESS");
    next();
  } catch (error) {
    console.error("ADMIN AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};