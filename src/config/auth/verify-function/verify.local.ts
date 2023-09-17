import UserModel from "../../../user/models/user.model";
import User from "../../../user/models/user.schema";
import { IVerifyOptions } from "passport-local";
import bcrypt from "bcryptjs";

// type CallbackFn<T> = (err?: Error | null, ret?: T) => void;
type CallbackFn = (
  error: any,
  // user?: false | Express.User | undefined,
  user?: User | undefined,
  options?: IVerifyOptions | undefined
) => void;

// VerifyFunction(username: string, password: string, done: (error: any, user?: false | Express.User | undefined, options?: passportLocal.IVerifyOptions | undefined) => void): void
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      _id?: string;
      email: string;
    }
  }
}
const verifyLocal = async (
  email: string,
  password: string,
  done: CallbackFn
) => {
  //check if user exist
  const userExist = await UserModel.findOne({ email: email }).lean();
  if (!userExist) done(new Error("User does not exist"), undefined);
  if (!password)
    done(
      new Error("Input Password or try logging in with a different method"),
      undefined
    );

  // verfiy password
  if (userExist) {
    const isMatch = await bcrypt.compare(
      password as string,
      userExist.password
    );

    if (!isMatch) done(new Error("Invalid Password or email"));

    done(null, userExist);
  }
};

export default verifyLocal;
