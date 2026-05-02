import Joi from "joi";

// -- Signup validation schema --
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

    age: Joi.number()
        .integer()
        .min(0)
        .max(120)
        .optional()
        .allow(null)
        .messages({
            "number.base": "Age must be a number",
            "number.min": "Age cannot be negative",
            "number.max": "Age seems invalid",
        }),

    presentAddress: Joi.string().trim().optional().allow(null, ""),

    permanentAddress: Joi.string().trim().optional().allow(null, ""),

    contact: Joi.string()
        .trim()
        .optional()
        .allow(null, "")
        .pattern(/^[0-9+\-\s()]+$/)
        .messages({
            "string.pattern.base": "Invalid contact number format",
        }),

    avatar: Joi.string().uri().optional().allow(null, "").messages({
        "string.uri": "Avatar must be a valid URL",
    }),

    coverAvatar: Joi.string().uri().optional().allow(null, "").messages({
        "string.uri": "Cover avatar must be a valid URL",
    }),

    verified: Joi.boolean().optional(),
});
