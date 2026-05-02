import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: "Too many requests. Please try again later.",
    },
});

export default globalLimiter;
