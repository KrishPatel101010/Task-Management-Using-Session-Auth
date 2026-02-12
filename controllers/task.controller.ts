import {
  getTasksService,
  getTaskByIdService,
  addTasksService,
  updateTaskService,
  deleteTaskService,
} from "../services/index.ts";
import type { Request, Response } from "express";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const data = await getTasksService(req.query);
    return res.status(200).json({ Tasks: data });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Please provide Id." });
  try {
    const data = await getTaskByIdService(String(req.params.id));
    return res.status(200).json({ Task: data });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const addTask = async (req: Request, res: Response) => {
  if (!req.body)
    return res.status(400).json({ message: "Please provide data." });
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }
  try {
    const userId = req.session.userId.toString();
    const data = await addTasksService(req.body, userId);
    return res
      .status(201)
      .json({ message: "Task created successfully.", Task: data });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Please provide Id." });
  if (!req.body)
    return res.status(400).json({ message: "Please provide data." });
  try {
    const data = await updateTaskService(String(req.params.id), req.body);
    if (!data) return res.status(400).json({ message: "No task found" });
    return res
      .status(200)
      .json({ message: "Task updated successfully.", Task: data });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Please provide Id." });
  try {
    const data = await deleteTaskService(String(req.params.id));
    if (!data) return res.status(400).json({ message: "No task found" });
    return res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
