class AppError extends Error {
    constructor(message, statusCode = 400, type = "BAD_REQUEST") {
        super(message);
        this.statusCode = statusCode; // HTTP status code
        this.type = type;             // error type for logging / categorization
        this.isOperational = true;    // distinguishes operational errors from programming errors
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
