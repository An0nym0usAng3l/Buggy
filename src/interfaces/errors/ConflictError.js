const HttpStatus = require("http-status-codes");
const BaseError = require("./BaseError");

class ConflictError extends BaseError {
    constructor(message = "Resource already exists", status = HttpStatus.CONFLICT, data = {}) {
        super(message, status, data);
        this.name = "ConflictError";
    }
}

module.exports = ConflictError;