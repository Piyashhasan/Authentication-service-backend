class AppError extends Error {
    constructor(message, statusCode, errors = null) {
        super(message);

        this.success = false;
        this.statusCode = statusCode;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
