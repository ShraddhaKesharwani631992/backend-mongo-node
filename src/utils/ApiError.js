// Extending standard nodejs Error
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;
    this.stack = stack || Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
