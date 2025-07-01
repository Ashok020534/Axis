export const successResponse = (res, message, statusCode = 200, data = {}) => {
    if (typeof message === 'object' && message !== null) {
        data = message;
        message = "Success";
    }
    return res.status(statusCode).json({
        message,
        isSuccess: true,
        data,
        responseCode: statusCode,
    });
};
class CustomError extends Error {
    constructor(message = "Something went wrong.", statusCode = 400) {
        super(message);
        this.name = "CustomError";
        this.statusCode = statusCode;
    }
}
export default CustomError;

export const errorResponse = (res, err, statusCode = 500, message = "Something went wrong.") => {
    return res.status(statusCode).json({
        message,
        error: err && err.message ? err.message : err,
        isSuccess: false,
        responseCode: statusCode,
    });
};
