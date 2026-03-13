import express from "express";
import apiRoutes from "./routes/api.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  process.env.STAGING_URL,
  process.env.PROD_URL,
  process.env.LOCAL_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))


app.set("trust proxy", 1);

// Routes
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
