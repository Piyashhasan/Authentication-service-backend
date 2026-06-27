import User from "../models/user.model.js";
import OTP from "../models/otp.model.js";
import bcrypt from "bcrypt";
import AppError from "../utils/ApiError.js";
import { sendResponse } from "../utils/ApiResponse.js";
import { config } from "../config.js";
import jwt from "jsonwebtoken";
import { otpSaltRoundValue } from "../constant.js";
import { sendOtpEmail } from "../helpers/sendOtpEmail.js";
import generateOtp from "../helpers/generateOpt.js";

// -- OTP VERIFY CONTROLLER --
// @desc         - OTP generate
// @route        - POST - /api/v1/otp/verify-otp
// @access       - public

export const otpVerify = async (req, res, next) => {
    try {
        const { userId, purpose, enteredOtp } = req.body;

        // ---- validate request
        if (!userId || !purpose || !enteredOtp) {
            throw new AppError("User ID, purpose, and OTP are required.", 400);
        }

        // ---- find OTP
        const otpDoc = await OTP.findOne({
            userId,
            purpose,
        });

        if (!otpDoc) {
            throw new AppError("Invalid or expired OTP.", 400);
        }

        // ---- check OTP expiration
        if (new Date() > otpDoc.expiresAt) {
            await otpDoc.deleteOne();
            throw new AppError("OTP has expired.", 400);
        }

        // ---- verify OTP
        const isOtpMatched = await bcrypt.compare(enteredOtp, otpDoc.otp);

        if (!isOtpMatched) {
            throw new AppError("The OTP you entered is incorrect.", 400);
        }

        // ---- OTP is valid, delete it (one-time use)
        await otpDoc.deleteOne();

        // ---- user exist or not
        const existUser = await User.findOne({ _id: userId });

        if (!existUser) {
            throw new AppError("User not exist, Please register..", 409);
        }

        // ---- generate refreshToken & AccessToken
        const refreshToken = jwt.sign(
            {
                userId: existUser.id,
                email: existUser.email,
            },
            config.JWT_SECRET,
            { expiresIn: "15d" }
        );

        const accessToken = jwt.sign(
            {
                userId: existUser.id,
                email: existUser.email,
            },
            config.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // ---- Set refresh token in HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });

        // ---- res data
        const data = {
            userId: existUser.id,
            email: existUser.email,
            accessToken,
        };

        return sendResponse(res, 200, "OTP verified successfully.", { data });
    } catch (error) {
        next(error);
    }
};

// -- OTP RE-GENERATE OTP CONTROLLER --
// @desc         - Regenerate OTP generate
// @route        - POST - /api/v1/otp/generate-otp
// @access       - public

export const reGenerateOtp = async (req, res, next) => {
    try {
        const { userId, purpose } = req.body;

        // ---- validate request
        if (!userId || !purpose) {
            throw new AppError("User ID and purpose are required.", 400);
        }

        // ---- check user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError("User not found.", 404);
        }

        // ---- delete previous OTP
        await OTP.deleteMany({
            userId,
            purpose,
        });

        // ---- generate new OTP
        const otp = generateOtp();

        // ---- hash OTP
        const hashedOtp = await bcrypt.hash(otp, otpSaltRoundValue);

        // ---- save OTP
        await OTP.create({
            userId,
            purpose,
            otp: hashedOtp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        // ---- send OTP email
        await sendOtpEmail(user.email, otp);

        return sendResponse(res, 200, "New OTP has been sent successfully.");
    } catch (error) {
        next(error);
    }
};
