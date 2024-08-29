import express from "express";
import { TaskController } from "../controller/task.controller.js";
import { TaskRepository } from "../repository/task.repository.js";
import { TaskService } from "../service/task.service.js";

const router = express.Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

export { router, taskController };
