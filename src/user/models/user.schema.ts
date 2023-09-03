import { prop, ReturnModelType } from "@typegoose/typegoose";
import { CreateUserInput } from "user/dto/inputs/user.input";
import createUser from "./methods/createUser";

class User {
  @prop({ required: true, unique: true })
  email: string;

  @prop()
  password: string;

  //   @prop({ default: false })
  //   isEmailverify?: boolean;

  public static async hashPassword() {}

  public static async createUser(
    this: ReturnModelType<typeof User>,
    input: CreateUserInput
  ) {
    return createUser(this, input)
  }

  public static async verifyPassword() {}
}

export default User;
