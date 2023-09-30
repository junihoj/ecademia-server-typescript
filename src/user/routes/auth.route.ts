import express from "express";
import AuthService from "../services/auth.service";

const authRouter = express.Router();

authRouter.post("/signup", AuthService.signup);
authRouter.post("/signin", AuthService.signin);

export default authRouter;
