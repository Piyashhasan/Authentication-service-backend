import { sendResponse } from "../utils/ApiResponse.js";

// -- GET USER INFORMATION CONTROLLER --
// @desc         - Profile update
// @route        - POST - /api/v1/profile/info
// @access       - private

export const getUserInfo = async (req, res, next) => {
    try {
        // const {} = req.boody;

        return sendResponse(res, 200, "User information ...");
    } catch (error) {
        next(error);
    }
};

// -- PROFILE UPDATE CONTROLLER --
// @desc         - Profile update
// @route        - POST - /api/v1/profile/info-update
// @access       - private

export const profileUpdate = async (req, res, next) => {
    try {
        // const {} = req.boody;

        return sendResponse(
            res,
            200,
            "User information update successfully..."
        );
    } catch (error) {
        next(error);
    }
};

// -- PROFILE IMAGE UPLOAD CONTROLLER --
// @desc         - Profile update
// @route        - POST - /api/v1/profile/image-upload
// @access       - private

export const profileImageUpload = async (req, res, next) => {
    try {
        // const {} = req.boody;

        return sendResponse(res, 200, "User photo upload successfully...");
    } catch (error) {
        next(error);
    }
};
