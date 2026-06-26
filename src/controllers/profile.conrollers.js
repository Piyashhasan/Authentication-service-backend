import User from "../models/user.model.js";
import { sendResponse } from "../utils/ApiResponse.js";
import { config } from "../config.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";

// -- GET USER INFORMATION CONTROLLER --
// @desc         - Profile update
// @route        - POST - /api/v1/profile/info
// @access       - private

export const getUserInfo = async (req, res, next) => {
    try {
        const { id } = req.user;

        if (!id) {
            throw new AppError("Unauthorized access.", 401);
        }

        const userInformation =
            await User.findById(id).select("-password -__v");

        if (!userInformation) {
            throw new AppError("User not found please register", 404);
        }

        return sendResponse(res, 200, "User information ...", {
            data: userInformation,
        });
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
        const { id } = req.user;

        const file = req.file;
        if (!file) {
            throw new AppError("Profile image is required.", 400);
        }

        // -- uplaod image --
        const filePath = req.file.path;
        const uploadImage = await uploadOnCloudinary(filePath);

        // -- find user --
        const user = await User.findById(id);
        if (!user) {
            throw new AppError("User not found.", 404);
        }

        // -- save data on DB --
        user.avatar = uploadImage.secure_url;
        await user.save();

        return sendResponse(res, 200, "Profile image uploaded successfully.");
    } catch (error) {
        next(error);
    }
};
