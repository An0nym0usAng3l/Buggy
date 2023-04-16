const HttpStatus = require("http-status-codes");
const ResponseManager = require("../response");

class ErrorHandler extends Error {
    constructor(message, status = HttpStatus.INTERNAL_SERVER_ERROR, data = {}) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        // Saving class getName in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        this.status = status;
        this.data = data;
        this.isOperationalError = true;
    }

    static methodNotAllowed(req, res, message = `You have tried to access an API endpoint (${req.url}) with a '${req.method}' method that does not exist.`) {
        ResponseManager.getResponseHandler(res).onError("MethodNotAllowed", HttpStatus.METHOD_NOT_ALLOWED, message)
    }

    static invalidPayload(req, res, message = `Provided payload is invalid`) {
        ResponseManager.getResponseHandler(res).onError("InvalidPayloadError", HttpStatus.BAD_REQUEST, message)
    }

    static notFound(req, res, message = "The resource you requested for was not found") {
        ResponseManager.getResponseHandler(res).onError("ResourceNotFoundErro", HttpStatus.NOT_FOUND, message)
    }

    static conflictError(req, res, message = "Resource already exists") {
        ResponseManager.getResponseHandler(res).onError("ConflictError", HttpStatus.CONFLICT, message)
    }

    static unknownError(err, res) {
        if (err.name || err.error) {
            if (err.name === "ValidationError" || (err.error && err.error.name === "ValidationError")) {
                return ResponseManager.getResponseHandler(res).onError(
                    err.name || err.error.name,
                    HttpStatus.BAD_REQUEST,
                    err.message || err.error.toString(),
                    err.errors || err.error.details,
                );
            }
            return ResponseManager.getResponseHandler(res).onError(err.name, err.status, err.message, err.data);
        }

        const errorMessage = process.env.NODE_ENV === "production" ? "Something bad happened!" : err.message;
        const errorData = process.env.NODE_ENV === "production" ? {} : err;
        return ResponseManager.getResponseHandler(res).onError(
            "InternalServerError",
            err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            errorMessage,
            errorData,
        );
    }
}
module.exports = ErrorHandler;
