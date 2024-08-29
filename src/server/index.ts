import cors from "cors";
import express from "express";
import { TaskRepository } from "./repository/task.repository.js";
import { TaskService } from "./service/task.service.js";

const app = express();
app.use(cors());
app.use(express.json());

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);

app.get("/api/tasks", taskService.getTasks.bind(taskService));
app.post("/api/tasks", taskService.createTask.bind(taskService));
app.delete("/api/tasks/:id", taskService.deleteTask.bind(taskService));
app.put("/api/tasks/:id", taskService.updateTask.bind(taskService));

app.get("*", (req, res) => res.send(`api Server - path: "${req.path}"`));
app.listen(3002, () => console.log("Server started"));
