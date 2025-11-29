import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
