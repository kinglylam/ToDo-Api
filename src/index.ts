import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import userRoutes from "./routes/UserRoutes";
import todoRoutes from "./routes/TodoRoutes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Connect to MongoDB
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error", err));

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
