import passport from "passport";
import * as passportLocal from "passport-local";
import verifyLocal from "./verify-function/verify.local";
import UserModel from "../../user/models/user.model";
const LocalStrategy = passportLocal.Strategy;
// var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(verifyLocal));

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      _id?: string;
      email: string;
    }
  }
}
passport.serializeUser((user: Express.User, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id: string, done) => {
  UserModel.findById(id, (_err: Error, user: Express.User) => {
    return done(null, user);
  });
});
export default passport;
