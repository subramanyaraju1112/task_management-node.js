import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectRedis } from "./config/redisClient.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectRedis();
    await connectDB();

    const app = express();
    const PORT = process.env.PORT;

    app.use(express.json());
    app.use(
      cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
      })
    );
    app.use("/auth", authRoutes);
    app.use("/user", taskRoutes);
    app.use("/admin", adminRoutes);

    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
  }
};

startServer();
