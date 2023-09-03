import passport from "passport";
import * as passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
// var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(() => {}));
export default passport;
