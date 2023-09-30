import { prop, ReturnModelType } from "@typegoose/typegoose";
// import { CreateUserInput } from "user/dto/inputs/user.input";
import createUser from "./methods/createUser";
import { CreateUserInput } from "../dto/inputs/user.input";
import verifyPassword from "./methods/verify-password";

class User {
  @prop({ required: true, unique: true })
  email: string;

  @prop()
  password: string;

  @prop()
  salt: string;

  @prop()
  name: string;

  @prop({ default: false })
  isEmailverify?: boolean;

  // @prop({
  //   validate: {
  //     validator: (v: string) => {
  //       const regexp = new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$");
  //       return regexp.test(v);
  //     },
  //     message: "value is over 10 characters long!",
  //   },
  // })
  // public username?: string;

  public static async hashPassword() {}

  public static async createUser(
    this: ReturnModelType<typeof User>,
    input: CreateUserInput
  ) {
    return createUser(this, input);
  }

  public static async verifyPassword(
    password: string,
    hashedPassword: string,
    salt: string
  ) {
    return verifyPassword(password, hashedPassword, salt);
  }
}

export default User;
