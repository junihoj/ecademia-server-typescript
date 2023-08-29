import express from "express";
import "dotenv/config";
import db from "./config/db";

async function bootstrap() {
  const app = express();
  db();
  app.get("/", () => {
    return "server running on port 8000";
  });
  app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
  });
}

bootstrap();
