const rateLimit = require(
  "express-rate-limit"
);

exports.loginLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 5,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
      success: false,
      message:
        "Too many login attempts. Try again in 15 minutes.",
    },
  });

exports.adminLoginLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 5,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
      success: false,
      message:
        "Too many admin login attempts. Try again in 15 minutes.",
    },
  });