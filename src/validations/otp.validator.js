import Joi from "joi";

// -- OTP validation schema --
export const otpGenerateValidationSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        "string.email": "Invalid email",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),
});
