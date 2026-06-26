import jwt from "jsonwebtoken";
import { config } from "../config.js";
import AppError from "../utils/ApiError.js";

export const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            throw new AppError("Authorization token is missing.", 401);
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new AppError("Authorization token is missing.", 401);
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        if (!decoded?.userId && decoded?.email) {
            throw new AppError("Invalid token token payload", 401);
        }

        req.user = {
            id: decoded.userId,
            email: decoded?.email,
        };

        next();
    } catch (error) {
        const jwtErrors = {
            TokenExpiredError: "Token_expire",
            JsonWebTokenError: "Wrong_token",
            NotBeforeError: "Token_not_valid",
        };

        const message = jwtErrors[error.name];

        if (message) {
            return next(new AppError(message, 401));
        }

        next(error);
    }
};
