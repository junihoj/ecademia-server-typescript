import crypto from "node:crypto";
export default async function verifyPassword(
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
