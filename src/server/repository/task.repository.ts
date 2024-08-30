import type { Request, Response } from "express";
import pool from "../config/db";
import type { Task } from "../types/task";

export class TaskRepository {
  async getTasks(req: Request): Promise<Task[]> {
    try {
      const { search } = req.query;
      let query = "SELECT * FROM tasks";
      let params: string[] = [];

      if (search) {
        query += " WHERE content ILIKE $1";
        params = [`%${search}%`];
      }

      query += " ORDER BY id ASC";

      const results = await pool.query(query, params);
      return results.rows;
    } catch (error) {
      console.log(error);
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
      await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
      return "Task deleted successfully";
    } catch (error) {
      throw error;
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      await pool.query("UPDATE tasks SET content = $1 WHERE id = $2", [
        content,
        id,
      ]);
      return "Task updated successfully";
    } catch (error) {
      throw error;
    }
  }
}
