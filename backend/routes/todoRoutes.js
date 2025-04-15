import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controllers/todoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTodo);
router.post("/create", authMiddleware, createTodo);
router.put("/update/:id", authMiddleware, updateTodo);
router.delete("/delete/:id", authMiddleware, deleteTodo);

export default router;
