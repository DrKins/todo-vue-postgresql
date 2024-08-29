import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import importedPool from "pg";
dotenv.config({
  path: fileURLToPath(new URL("../../../.env", import.meta.url)),
});

const pool = new importedPool.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

export default pool;
