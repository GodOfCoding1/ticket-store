import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  statusCode = 400;
  serializeErrors() {
    return [{ message: this.message }];
  }
}
