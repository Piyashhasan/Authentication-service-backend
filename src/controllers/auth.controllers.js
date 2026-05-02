import AppError from "../utils/ApiError.js";
import { sendResponse } from "../utils/ApiResponse.js";

// -- SIGNUP CONTROLLER --
// @desc         - Signup user
// @route        - POST - /api/v1/auth/sign-up
// @access       - private
// @error handle - throw new AppError("...message ...", status code (401));
// @res handle   - return sendResponse(res, 404, "Routes Not Found ...!");

export const signUpController = async (req, res, next) => {
    try {
        return sendResponse(res, 200, "Sign Up work fine ...", {});
    } catch (error) {
        next(error);
    }
};

// -- SIGNIN CONTROLLER --
// @desc         - Signup user
// @route        - POST - /api/v1/auth/sign-in
// @access       - private
// @error handle - throw new AppError("User already exists", 401);
// @res handle   - return sendResponse(res, 404, "Routes Not Found ...!");

export const signiNController = async (req, res, next) => {
    try {
        return sendResponse(res, 200, "Sign In work fine ...", {});
    } catch (error) {
        next(error);
    }
};
