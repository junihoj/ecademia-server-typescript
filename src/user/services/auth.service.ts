import { NextFunction, Request, Response } from "express";
// import { CreateUserInput, SignInput } from "user/dto/inputs/user.input";
import UserModel from "../models/user.model";
import APIResponse from "../../utils/responses";
import crypto from "node:crypto";
import { CreateUserInput, SignInInput } from "../dto/inputs/user.input";
import passport from "../../config/auth/passport-strategies";
// import { AuthenticateCallback } from "passport";

export default class AuthService {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("body", req.body);
      const input = req.body as CreateUserInput;
      const data = await UserModel.createUser(input);
      res.send(new APIResponse(200, true, "success", data));
    } catch (err) {
      next(err);
    }
  }

  static async verifyPassword(
    password: string,
    hashedPassword: string,
    salt: string
  ) {
    const hashedInputPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 512, "sha512")
      .toString("hex");
    const isMatch = hashedPassword === hashedInputPassword;
    return isMatch;
  }

  static async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body as SignInInput;
      //1. check if user exist
      //2. check check if password is correct
      //3. authenticate
      const userExist = await UserModel.findOne({
        email: input.username,
      }).lean();
      if (!userExist) throw new Error("invalid username or email");
      const passwordVerified = await UserModel.verifyPassword(
        input.password,
        userExist.password,
        userExist.salt
      );
      if (!passwordVerified) throw new Error("Invalid user name or password");

      await passport.authenticate(
        "local",
        (
          err: any,
          user: any
          // info?: object | string | Array<string | undefined>
          // status?: number | Array<number | undefined>
        ) => {
          if (!user) throw new Error("Invalid username or password");
          if (err) {
            next(err);
          }
          req.login(user, (err) => {
            if (err) {
              const userDefineError = new Error("user define");
              userDefineError.name = "custom";

              next(userDefineError);
            }
          });

          delete user.password;
          delete user.salt;
          res.send(user);
        }
      )(req, res);
    } catch (err) {
      next(err);
    }
  }
  static async encryptPassword() {}
}
