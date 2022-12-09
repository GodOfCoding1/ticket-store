import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Error no such route");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "not found" }];
  }
}
