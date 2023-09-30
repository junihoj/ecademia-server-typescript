import { NextFunction, Response, Request } from "express";
import { Service } from "typedi";
import { APIResponseObject } from "./responses";

@Service()
export default class ErrorHandler {
  handleDuplicateKeyError(err: any, res: Response) {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    res.status(code).send(
      APIResponseObject({
        statusCode: code,
        success: false,
        data: { messages: error, fields: field },
      })
    );
  }

  handleValidationError(err: any, res: Response) {
    let errors = Object.values(err.errors).map((el: any) => el.message);
    let fields = Object.values(err.errors).map((el: any) => el.path);
    let code = 400;
    if (errors.length > 1) {
      const formattedErrors = errors.join("");
      res.status(code).send(
        APIResponseObject({
          statusCode: code,
          success: false,
          data: { messages: formattedErrors, fields: fields },
        })
      );
    } else {
      res.status(code).send(
        APIResponseObject({
          statusCode: code,
          success: false,
          data: { messages: errors, fields: fields },
        })
      );
    }
  }

  handleCustomError(err: any, res: Response, next: NextFunction) {
    res.status(400).send(
      APIResponseObject({
        statusCode: 400,
        success: false,
        message: err.message,
      })
    );
    next();
  }

  handleError(err: any, res: Response, next: NextFunction) {
    try {
      if (err.name === "ValidationError") {
        this.handleValidationError(err, res);
        next();
      }

      if (err.code && err.code == 11000) {
        this.handleDuplicateKeyError(err, res);
        next();
      }
      if (err.name === "custom") {
      }
      res.status(500).send("An unknown error occurred.");
    } catch (err) {
      res.status(500).send("An unknown error occurred.");
    }
  }
}

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("GLOBAL ERROR", err);
  console.log("GLOBAL ERROR NAME", err.name);
  const errorHandler = new ErrorHandler();
  errorHandler.handleError(err, res, next);
};
