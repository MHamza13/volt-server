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
connectDB();

const app = express();

// ================= STATIC FILES =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= MIDDLEWARES =================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://volt-ride-wheat.vercel.app",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ================= API ROUTES =================
app.use("/api/auth", userRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/payment", paymentRoutes);
// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Volt Server is running!",
    endpoints: {
      health: "/api",
      auth: "/api/auth",
      bikes: "/api/bikes",
      stations: "/api/stations",
      rides: "/api/rides",
    },
  });
});

// ================= HEALTH CHECK =================
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API is running fine 🚀",
  });
});

// ================= EXPORT FOR VERCEL =================
module.exports = app;

// ================= LOCAL SERVER =================
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});