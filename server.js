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
    origin: true,
    credentials: true,
  }),
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
  res.send(`
    <html>
      <head>
        <title>Volt Server</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #0f172a;
            color: white;
            font-family: Arial, sans-serif;
          }

          .box {
            text-align: center;
            padding: 40px;
            border-radius: 16px;
            background: #1e293b;
            box-shadow: 0 0 20px rgba(0,0,0,0.4);
          }

          h1 {
            color: #22c55e;
            margin-bottom: 10px;
          }

          p {
            color: #cbd5e1;
          }
        </style>
      </head>

      <body>
        <div class="box">
          <h1>🚀 Volt Backend Running</h1>
          <p>Your server is working successfully.</p>
        </div>
      </body>
    </html>
  `);
});

// ================= EXPORT FOR VERCEL =================
module.exports = app;

// ================= LOCAL SERVER =================
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
