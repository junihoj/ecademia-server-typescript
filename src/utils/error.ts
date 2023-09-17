import { Response } from "express";

export const handleError = (err: any, res: Response) => {
  if (err.name === "ValidationError") {
    let errors = Object.values(err.errors).map((el: any) => el.message);
    let fields = Object.values(err.errors).map((el: any) => el.path);
    let code = 400;
    if (errors.length > 1) {
      const formattedErrors = errors.join(" ");
      res.status(code).send({ messages: formattedErrors, fields: fields });
    } else {
      res.status(code).send({ messages: errors, fields: fields });
    }
  }
};
