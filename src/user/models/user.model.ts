import { getModelForClass } from "@typegoose/typegoose";
import User from "./user.schema";

const UserModel = getModelForClass(User);

export default UserModel;
