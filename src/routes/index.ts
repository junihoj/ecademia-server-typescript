import { Router } from "express-serve-static-core";
import authRouter from "../user/routes/auth.route";

const routes = (app: {
  use: (path: string, expressRouter: Router) => void;
}) => {
  app.use("/auth", authRouter);
};

export default routes;
