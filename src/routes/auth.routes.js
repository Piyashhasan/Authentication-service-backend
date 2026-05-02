import express from "express";
import {
    signiNController,
    signUpController,
} from "../controllers/auth.controllers.js";
import joiValidator from "../middlewares/joi.validate.middleware.js";
import { signUpValidationSchema } from "../validations/auth.validation.js";

// -- route create --
const authRoute = express.Router();

// -- api endpoints --
authRoute
    .post("/sign-up", joiValidator(signUpValidationSchema), signUpController)
    .post("/sign-in", signiNController);

export default authRoute;
