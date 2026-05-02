import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import authRoute from "./routes/auth.routes.js";
import globalLimiter from "./middlewares/rate.limiter.middleware.js";
import globalErrorMiddleware from "./middlewares/global.error.middleware.js";
import { sendResponse } from "./utils/ApiResponse.js";
import { config } from "./config.js";

// --- Initialize app ---
const app = express();

// -- Middleware --
app.disable("x-powered-by");
app.use(helmet());
// app.use(mongoSanitize());
app.use(hpp());
app.use(globalLimiter);
app.use(
    cors({
        origin: config.CLIENT_URL || config.CLIENT_LOCAL_URL,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(
    express.urlencoded({
        extended: true,
        inflate: true,
        limit: "1mb",
        parameterLimit: 5000,
    })
);
app.use(express.text());
app.use(express.raw());
app.use(express.static("public"));

// ================= API V1 endpoints start =================
app.use("/api/v1/auth", authRoute);
// ================= API V1 endpoints end ===================

// -- API health check --
app.get("/api/health", (req, res) => {
    return sendResponse(res, 200, "API Health is Ok...!");
});

// -- 404 Not Found route handler --
app.use((req, res) => {
    return sendResponse(res, 404, "Routes Not Found ...!");
});

// -- Global Error Handler --
app.use(globalErrorMiddleware);

// -- export app --
export default app;
