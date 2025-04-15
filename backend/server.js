import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://todo-frontend-ten-woad.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
