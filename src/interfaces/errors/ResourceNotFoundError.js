const HttpStatus = require("http-status-codes");
const BaseError = require("./BaseError");

class ResourceNotFoundError extends BaseError {
  constructor(
    message = "You have attempted to access an API endpoint that does not exist.",
    status = HttpStatus.NOT_FOUND,
    data = {},
  ) {
    super(message, status, data);
    this.name = "ResourceNotFoundError";
  }
}
module.exports = ResourceNotFoundError;
