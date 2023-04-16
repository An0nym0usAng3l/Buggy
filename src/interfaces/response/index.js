const HttpStatus = require("http-status-codes");

const BasicResponse = {
    success: false,
    status_code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: "",
};

class ResponseManager {
    static get HTTP_STATUS() {
        return HttpStatus;
    }

    static getResponseHandler(res) {
        return {
            onSuccess(data, message, code, links) {
                return ResponseManager.respondWithSuccess(res, code, data, message, links);
            },
            onError(errorName, errorCode, errorMessage, data) {
                return ResponseManager.respondWithError(res, errorName, errorCode, errorMessage, data);
            },
        };
    }

    static respondWithSuccess(
        res,
        code = HttpStatus.OK,
        data = {},
        message = "success",
        links = [],
    ) {
        const response = { ...BasicResponse };
        response.success = true;
        response.message = message;
        response.data = data;
        response.links = links;
        response.status_code = code;
        return res.status(code).json(response);
    }

    static respondWithError(
        res,
        errorName,
        errorCode = HttpStatus.INTERNAL_SERVER_ERROR,
        message = "Unknown error",
        data = {},
    ) {
        const response = { ...BasicResponse };
        response.success = false;
        response.name = errorName;
        response.message = message;
        response.status_code = errorCode;
        response.data = data;
        return res.status(errorCode).json(response);
    }
}
module.exports = ResponseManager;
