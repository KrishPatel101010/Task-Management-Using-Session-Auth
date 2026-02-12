import express, { Router } from "express";
import {taskValidator } from "../middlewares/index.ts";
import {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/index.ts";

const router: Router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", taskValidator, addTask);
router.put("/:id", taskValidator, updateTask);
router.delete("/:id", deleteTask);

export default router;
