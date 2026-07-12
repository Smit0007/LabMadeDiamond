const express = require(
  "express"
);

const cors = require(
  "cors"
);

const helmet = require(
  "helmet"
);

const morgan = require(
  "morgan"
);

const authRoutes =
  require("./routes/authRoutes");

const adminRoutes = require(
  "./routes/adminRoutes"
);

const inventoryRoutes = require(
  "./routes/inventoryRoutes"
);

const uploadRoutes = require(
  "./routes/uploadRoutes"
);

const quoteRoutes =
  require(
    "./routes/quoteRoutes"
  );

const otpRoutes =
  require("./routes/otpRoutes");

const passwordRoutes = require(
  "./routes/passwordRoutes"
);

const app = express();

app.disable("x-powered-by");

app.set(
  "trust proxy",
  1
);

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);


app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],
  })
);

app.use(morgan("dev"));

app.use(
  express.json({
    limit: "2mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "2mb",
  })
);

app.get("/", (req, res) => {
  res.json({
    message:
      "Diamond API Running",
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/inventory",
  inventoryRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/quotes",
  quoteRoutes
);

app.use(
  "/api/otp",
  otpRoutes
);



app.use(
  "/api/password",
  passwordRoutes
);


module.exports = app;