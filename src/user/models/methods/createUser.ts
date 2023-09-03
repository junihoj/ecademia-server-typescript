import { ReturnModelType } from "@typegoose/typegoose";
import User from "../user.schema";
import { CreateUserInput } from "user/dto/inputs/user.input";
import bcrypt from "bcryptjs";
export default async function createUser(
  userModel: ReturnModelType<typeof User>,
  input: CreateUserInput
) {
  const hashPassword = bcrypt.hashSync(input.password, bcrypt.genSaltSync(10));
  input.password = hashPassword;
  const userExist = await userModel.find({ email: input.email });
  if (userExist) throw new Error("user already Exist");

  const newUser = await userModel.create({ ...input });

  return newUser;
}
