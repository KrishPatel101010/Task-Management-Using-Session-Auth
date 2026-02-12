import { Task } from "../models/index.ts";
interface Data {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  userId: string;
}

export const getTasksService = async (query: any) => {
  const filter: any = {};
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  if (query.status) filter.status = query.status;
  if (query.search) {
    filter.title = { $regex: query.search, $options: "i" };
  }
  const data = await Task.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  if (!data) throw new Error("No tasks found.");
  return data;
};

export const getTaskByIdService = async (taskId: string) => {
  const data = await Task.findById(taskId);
  if (!data) throw new Error("No tasks found.");
  return data;
};

export const addTasksService = async (data: Data, userId: string) => {
  const newTask = await Task.create({
    title: data.title,
    description: data.description,
    status: data.status,
    dueDate: data.dueDate,
    userId: userId,
  });
  return newTask;
};

export const updateTaskService = async (taskId: string, data: Data) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, data, { new: true });

  return updatedTask;
};

export const deleteTaskService = async (taskId: string) => {
  const deleteTask = await Task.findByIdAndDelete(taskId);

  return deleteTask;
};
