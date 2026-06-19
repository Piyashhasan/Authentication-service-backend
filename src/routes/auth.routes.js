import express from "express";
import {
    forgetPassword,
    signInController,
    signUpController,
} from "../controllers/auth.controllers.js";
import joiValidator from "../middlewares/joi.validate.middleware.js";
import {
    forgetPasswordValidationSchema,
    signInValidationSchema,
    signUpValidationSchema,
} from "../validations/auth.validation.js";

// -- route create --
const authRoute = express.Router();

// -- api endpoints --
authRoute
    .post("/sign-up", joiValidator(signUpValidationSchema), signUpController)
    .post("/sign-in", joiValidator(signInValidationSchema), signInController)
    .post(
        "/forget-password",
        joiValidator(forgetPasswordValidationSchema),
        forgetPassword
    );

export default authRoute;
