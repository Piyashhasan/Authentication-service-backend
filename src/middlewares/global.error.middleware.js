const globalErrorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = null;

    if (err.isJoi) {
        // -- Joi Validation Error --
        statusCode = 400;
        message = "Validation Failed";

        errors = err.details.map((item) => ({
            field: item.path.join("."),
            message: item.message.replace(/"/g, ""),
        }));
    } else if (err.name === "ValidationError") {
        // -- Mongoose Validation Error --
        statusCode = 400;
        message = "Validation Failed";

        errors = Object.values(err.errors).map((item) => ({
            field: item.path,
            message: item.message,
        }));
    } else if (err.name === "CastError") {
        // -- Mongoose Cast Error (Invalid ObjectId) --
        statusCode = 400;
        message = `Invalid ${err.path}`;
    } else if (err.code === 11000) {
        // -- Mongo Duplicate Key Error --
        statusCode = 409;
        message = `${Object.keys(err.keyValue)[0]} already exists`;
    }

    //    -- final error response --
    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        message,
        ...(errors && { errors }),
    });
};

export default globalErrorMiddleware;
