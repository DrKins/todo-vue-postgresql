import type { NextFunction, Request, Response } from "express";
import { TaskRepository } from "../repository/task.repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getTasks(req: Request, res: Response, next?: NextFunction) {
    const tasks = await this.taskRepository.getTasks();
    res.json(tasks);
  }

  async createTask(req: Request, res: Response, next?: NextFunction) {
    const task = await this.taskRepository.createTask(req, res);
    res.json(task);
  }

  async deleteTask(req: Request, res: Response, next?: NextFunction) {
    const task = await this.taskRepository.deleteTask(req, res);
    res.json(task);
  }

  async updateTask(req: Request, res: Response, next?: NextFunction) {
    const task = await this.taskRepository.updateTask(req, res);
    res.json(task);
  }
}
