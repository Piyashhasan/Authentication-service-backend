import bcrypt from "bcrypt";
import { sendOtpEmail } from "./sendOtpEmail.js";
import OTP from "../models/otp.model.js";
import generateOtp from "./generateOpt.js";
import { otpSaltRoundValue } from "../constant.js";
import AppError from "../utils/ApiError.js";

export const createOtp = async (userId, email, purpose) => {
    if (!userId || !email || !purpose) {
        throw new AppError("Required value missing..", 400);
    }

    // -- otp generate --
    const otpCode = generateOtp();
    if (!otpCode) {
        throw new AppError("OTP generation failed", 500);
    }

    // -- hash otp --
    const hashedOtp = await bcrypt.hash(otpCode, otpSaltRoundValue);

    // -- same purpose OTP data delete from DB --
    await OTP.deleteMany({
        userId,
        purpose,
    });

    // -- otp save on DB --
    await OTP.create({
        userId,
        otp: hashedOtp,
        purpose,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // -- otp email send --
    await sendOtpEmail(email, otpCode);
};
