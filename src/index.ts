import express from "express";
import "dotenv/config";
import db from "./config/db";
// import { Request, Response } from "express";
import morgan from "morgan";
import routes from "./routes";
import session from "express-session";
import MdStore from "connect-mongodb-session";
import passport from "./config/auth/passport-strategies";
import { errorMiddleware } from "./utils/error";

async function bootstrap() {
  const app = express();
  db();

  //session

  const connectSessionStore = MdStore(session);
  const sessionStore = new connectSessionStore({
    uri: process.env.MONGODB_URL as string,
    collection: "userSession",
  });

  app.use(
    session({
      name: "ecademia",
      store: sessionStore,
      resave: false,
      secret: process.env.SESSION_SECRET as string,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // One day
        sameSite: process.env.NODE_ENV !== "local" ? "none" : "lax",
        secure: process.env.NODE_ENV !== "local" ? true : false,
      },
      unset: "destroy",
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.set("trust proxy", 1);

  app.use(morgan("dev"));
  // app.get("/", (_req: Request, res: Response) => {
  //   res.send("server running on port 8000");
  // });
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json({ limit: "5mb" }));
  routes(app);
  app.use(errorMiddleware); // Error Middleware here

  app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
  });
}

bootstrap();
