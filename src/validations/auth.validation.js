import Joi from "joi";

// -- SignUp validation schema --
export const signUpValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .optional()
        .allow(null, "")
        .messages({
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name cannot exceed 50 characters",
        }),

    email: Joi.string().trim().email().required().messages({
        "string.email": "Invalid email",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),

    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be minimum 6 characters",
        "string.empty": "Password is required",
        "any.required": "Password is required",
    }),
});

// -- SignIn validation schema --
export const signInValidationSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        "string.email": "Invalid email",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),

    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be minimum 6 characters",
        "string.empty": "Password is required",
        "any.required": "Password is required",
    }),
});
