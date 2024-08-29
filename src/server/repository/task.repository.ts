import type { Request, Response } from "express";
import pool from "../config/db";
import type { Task } from "../types/task";

export class TaskRepository {
  async getTasks(): Promise<Task[]> {
    try {
      const results = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
      return results.rows;
    } catch (error) {
      throw error;
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const { content } = req.body;
      const results = await pool.query(
        "INSERT INTO tasks (content) VALUES ($1) RETURNING *",
        [content],
      );
      return results.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const results = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
      return "Task deleted successfully";
    } catch (error) {
      throw error;
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const results = await pool.query(
        "UPDATE tasks SET content = $1 WHERE id = $2",
        [content, id],
      );
      return "Task updated successfully";
    } catch (error) {
      throw error;
    }
  }
}
