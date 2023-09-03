import { ReturnModelType } from "@typegoose/typegoose";
import User from "../user.schema";
import { CreateUserInput } from "user/dto/inputs/user.input";
export default async function createUser(
  userModel: ReturnModelType<typeof User>,
  input: CreateUserInput
) {
  const userExist = await userModel.find({ email: input.email });
  if (userExist) throw new Error("user already Exist");

  //   const newUser = userModel.create({email:});
}
