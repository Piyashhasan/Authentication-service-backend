import Joi from "joi";

// -- Signup validation schema --
export const signUpValidationSchema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
    }),

    email: Joi.string().email().required().messages({
        "string.email": "Invalid email",
        "string.empty": "Email is required",
    }),

    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be minimum 6 characters",
        "string.empty": "Password is required",
    }),
});
