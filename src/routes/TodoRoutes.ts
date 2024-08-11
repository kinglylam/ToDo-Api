import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/TodoController";
import { authMiddleware } from "../middlewares/Auth";

const router = Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
