import express from "express";
import joiValidator from "../middlewares/joi.validate.middleware.js";
import { otpGenerateValidationSchema } from "../validations/otp.validator.js";
import { otpGenerate } from "../controllers/otp.controllers.js";

// -- route create --
const otpRoute = express.Router();

// -- api endpoints --
otpRoute.post(
    "/otp-generate",
    joiValidator(otpGenerateValidationSchema),
    otpGenerate
);

export default otpRoute;
