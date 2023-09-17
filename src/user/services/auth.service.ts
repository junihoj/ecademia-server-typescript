import { Request, Response } from "express";
import { CreateUserInput } from "user/dto/inputs/user.input";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import APIResponse from "../../utils/responses";

export default class AuthService {
  static async signup(req: Request, res: Response) {
    try {
      console.log("body", req.body);
      const input = req.body as CreateUserInput;
      const data = await UserModel.createUser(input);
      res.send(new APIResponse(200, true, "success", data));
    } catch (err) {
      console.log(err);
      res.send(new APIResponse(400, false, err.message));
    }
  }

  static async verifyPassword(password: string, userPassword: string) {
    const isMatch = await bcrypt.compare(password as string, userPassword);

    return isMatch;
  }

  static async signin() {}
  static async encryptPassword() {}
}
