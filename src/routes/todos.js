import express from "express";
const router = express.Router();
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todosController.js";

// GET    /api/todos        - Ambil semua todo
// GET    /api/todos/:id    - Ambil satu todo
// POST   /api/todos        - Buat todo baru
// PUT    /api/todos/:id    - Update todo
// DELETE /api/todos/:id    - Hapus todo

router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
