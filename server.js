const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");

// Routes Import
const userRoutes = require("./routes/auth");
const bikeRoutes = require("./routes/Bike");
const stationRoutes = require("./routes/Stations");
const rideRoutes = require("./routes/Ride");
const paymentRoutes = require("./routes/payment");

const app = express();

// ================= DATABASE =================
connectDB();

// ================= CORS =================
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ================= MIDDLEWARES =================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ================= STATIC FILES =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= API ROUTES =================
app.use("/api/auth", userRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/payment", paymentRoutes);

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Volt Backend</title>

        <style>
          *{
            margin:0;
            padding:0;
            box-sizing:border-box;
          }

          body{
            width:100%;
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background:#0f172a;
            font-family:Arial, sans-serif;
          }

          .container{
            background:#1e293b;
            padding:40px;
            border-radius:20px;
            text-align:center;
            box-shadow:0 0 20px rgba(0,0,0,0.4);
          }

          h1{
            color:#22c55e;
            margin-bottom:10px;
            font-size:38px;
          }

          p{
            color:#cbd5e1;
            font-size:18px;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>🚀 Volt Backend Running</h1>
          <p>Server is running successfully.</p>
        </div>
      </body>
    </html>
  `);
});

// ================= 404 ROUTE =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================= EXPORT FOR VERCEL =================
module.exports = app;

// ================= LOCAL SERVER =================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});