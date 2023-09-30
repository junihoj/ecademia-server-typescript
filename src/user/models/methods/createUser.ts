import { ReturnModelType } from "@typegoose/typegoose";
import User from "../user.schema";
// import { CreateUserInput } from "user/dto/inputs/user.input";
import crypto from "node:crypto";
import { CreateUserInput } from "../../dto/inputs/user.input";

export default async function createUser(
  userModel: ReturnModelType<typeof User>,
  input: CreateUserInput
) {
  const salt = crypto.randomBytes(16).toString();
  console.log("salt", salt);

  input.salt = salt;
  const hashPassword = crypto
    .pbkdf2Sync(input.password, salt, 10000, 512, "sha512")
    .toString("hex");
  console.log("hash", hashPassword);
  input.password = hashPassword;
  //   const userExist = await userModel.find({ email: input.email });
  //   if (userExist) throw new Error("user already Exist");

  const newUser = await userModel.create({ ...input });
  await newUser.save();

  return newUser.toObject();
}
