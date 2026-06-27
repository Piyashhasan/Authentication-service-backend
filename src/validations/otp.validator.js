import Joi from "joi";

// -- OTP verify schema --
export const otpVerifyValidationSchema = Joi.object({
    userId: Joi.string().trim().required().messages({
        "string.empty": "User ID is required.",
        "any.required": "User ID is required.",
    }),

    purpose: Joi.string()
        .valid("signupVerification", "emailVerification", "forgotPassword")
        .required()
        .messages({
            "any.only": "Invalid OTP purpose.",
            "any.required": "Purpose is required.",
        }),

    enteredOtp: Joi.string()
        .trim()
        .length(6)
        .pattern(/^\d{6}$/)
        .required()
        .messages({
            "string.empty": "OTP is required.",
            "string.length": "OTP must be exactly 6 digits.",
            "string.pattern.base": "OTP must contain exactly 6 digits.",
            "any.required": "OTP is required.",
        }),
});

// -- OTP re-generation schema --
export const otpRegenerationValidationSchema = Joi.object({
    userId: Joi.string().trim().required().messages({
        "string.empty": "User ID is required.",
        "any.required": "User ID is required.",
    }),

    purpose: Joi.string()
        .valid("signupVerification", "emailVerification", "forgotPassword")
        .required()
        .messages({
            "any.only": "Invalid OTP purpose.",
            "any.required": "Purpose is required.",
        }),
});
