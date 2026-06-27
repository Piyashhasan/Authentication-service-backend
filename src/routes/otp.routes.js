import express from "express";
import joiValidator from "../middlewares/joi.validate.middleware.js";
import {
    otpRegenerationValidationSchema,
    otpVerifyValidationSchema,
} from "../validations/otp.validator.js";
import { otpVerify, reGenerateOtp } from "../controllers/otp.controllers.js";

// -- route create --
const otpRoute = express.Router();

// -- api endpoints --
otpRoute
    .post("/verify-otp", joiValidator(otpVerifyValidationSchema), otpVerify)
    .post(
        "/generate-otp",
        joiValidator(otpRegenerationValidationSchema),
        reGenerateOtp
    );

export default otpRoute;
