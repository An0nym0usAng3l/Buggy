const HttpStatus = require("http-status-codes");

class BaseError extends Error {
    constructor(message, status = HttpStatus.INTERNAL_SERVER_ERROR, data = {}) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        // Saving class getName in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        this.status = status;
        this.data = data;
        this.isOperationalError = true;
    }
}

module.exports = BaseError;