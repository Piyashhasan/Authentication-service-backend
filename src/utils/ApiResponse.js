export const sendResponse = (
    res,
    statusCode = 200,
    message = "Success",
    { data, pagination, ...extras } = {}
) => {
    return res.status(statusCode).json({
        status: statusCode,
        success: statusCode < 400,
        message,
        ...(data !== undefined && { data }),
        ...(pagination !== undefined && { pagination }),
        ...extras,
    });
};
