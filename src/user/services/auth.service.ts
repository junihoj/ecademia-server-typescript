import { Request, Response } from "express";
import { CreateUserInput } from "user/dto/inputs/user.input";
import UserModel from "../models/user.model";
import APIResponse from "../../utils/responses";

export default class AuthService {
  static async signup(req: Request, res: Response) {
    try {
      console.log("body", req.body);
      const input = req.body as CreateUserInput;
      const data = UserModel.createUser(input);

      res.send(new APIResponse(200, true, "success", data));
    } catch (err) {
      res.send(new APIResponse(400, true, err.message));
    }
  }

  static async verifyPassword() {}

  static async signin() {}
  static async encryptPassword() {}
}
