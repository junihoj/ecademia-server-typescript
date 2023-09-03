import express from "express";
import "dotenv/config";
import db from "./config/db";
import { Request, Response } from "express";
import morgan from "morgan";
import routes from "./routes";

async function bootstrap() {
  const app = express();
  db();

  app.use(morgan("dev"));
  app.get("/", (_req: Request, res: Response) => {
    res.send("server running on port 8000");
  });
  app.use(express.json({ limit: "5mb" }));
  routes(app);

  app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
  });
}

bootstrap();
