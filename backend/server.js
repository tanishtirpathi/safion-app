// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const incidentRoutes = require("./routes/incidents");
const sosRoutes = require("./routes/sos");
const newsRoutes = require("./routes/news.routes");

const chatbotRoute = require("./routes/chatbot");
const app = express();
const allowed = ["http://localhost:5000", "https://safion-ten.vercel.app"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile apps / curl
      if (allowed.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/news", newsRoutes);
app.use("/api/chatbot", chatbotRoute);

// ✅ connect to MongoDB (only once)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// routes
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/sos", sosRoutes);

// fallback
app.get("/", (req, res) => res.send("🚀 Safety backend is up"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
