import express from "express";
import { CreateTodo, DeleteTodo, GetTodosByUser, ToggleTodo } from "../controllers/todoControllers.js";

const router = express.Router();

router.post("/", CreateTodo);
router.get("/:email", GetTodosByUser);
router.delete("/:id", DeleteTodo);
router.put("/:id", ToggleTodo);

export default router;