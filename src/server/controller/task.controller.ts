import type { Request, Response } from "express";
import { TaskService } from "../service/task.service";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  async getTasks(req: Request, res: Response) {
    const tasks = await this.taskService.getTasks(req, res);
    res.json(tasks);
  }

  async createTask(req: Request, res: Response) {
    const task = await this.taskService.createTask(req, res);
    res.json(task);
  }

  async deleteTask(req: Request, res: Response) {
    const results = await this.taskService.deleteTask(req, res);
    res.json(results);
  }

  async updateTask(req: Request, res: Response) {
    const results = await this.taskService.updateTask(req, res);
    res.json(results);
  }
}
