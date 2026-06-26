import { sendResponse } from "../utils/ApiResponse.js";

// -- OTP GENERATE CONTROLLER --
// @desc         - OTP generate
// @route        - POST - /api/v1/otp/generate
// @access       - public

export const otpGenerate = async (req, res, next) => {
    try {
        const { email } = req.body;

        return sendResponse(res, 200, "OTP generate successfully ...");
    } catch (error) {
        next(error);
    }
};
