import type { NextFunction, Request, Response } from "express";
import { TaskRepository } from "../repository/task.repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getTasks(req: Request, res: Response, next?: NextFunction) {
    try {
      const tasks = await this.taskRepository.getTasks();
      return tasks;
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks" });
    }
  }

  async createTask(req: Request, res: Response, next?: NextFunction) {
    try {
      const task = await this.taskRepository.createTask(req, res);
      return task;
    } catch (error) {
      res.status(500).json({ message: "Error creating task" });
    }
  }

  async deleteTask(req: Request, res: Response, next?: NextFunction) {
    try {
      const task = await this.taskRepository.deleteTask(req, res);
      return task;
    } catch (error) {
      res.status(500).json({ message: "Error deleting task" });
    }
  }

  async updateTask(req: Request, res: Response, next?: NextFunction) {
    try {
      const task = await this.taskRepository.updateTask(req, res);
      return task;
    } catch (error) {
      res.send(500).json({ message: "Error updating task" });
    }
  }
}
