import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";
import AppError from "../utils/ApiError.js";
import fs from "fs";

cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
});

// --- File upload functionality ---
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new AppError("File path is required.", 400);
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // -- delete temp file after successful upload --
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        throw new AppError("Failed to upload file to Cloudinary.", 500);
    }
};
