import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/ApiError.js";
import { saltRounds } from "../constant.js";
import { sendResponse } from "../utils/ApiResponse.js";
import { config } from "../config.js";
import cookieParser from "cookie-parser";

// -- SIGNUP CONTROLLER --
// @desc         - Signup user
// @route        - POST - /api/v1/auth/sign-up
// @access       - public

export const signUpController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // ---- validation check
        if (!name || !email || !password) {
            throw new AppError("Must fill in the required input field..", 400);
        }

        // ---- user exist
        const existUser = await User.findOne({ email });
        if (existUser) {
            throw new AppError("User alreay exist, Please login..", 409);
        }

        // ---- password hash
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // ---- create user
        const userCreate = await User.create({
            name,
            email,
            password: hashPassword,
        });

        if (!userCreate) {
            throw new AppError("Failed to create user..", 500);
        }

        // ---- generate refreshToken & accessToken
        const refreshToken = jwt.sign(
            {
                userId: userCreate.id,
                email: userCreate.email,
            },
            config.JWT_SECRET,
            { expiresIn: "15d" }
        );

        const accessToken = jwt.sign(
            {
                userId: userCreate.id,
                email: userCreate.email,
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
            userId: userCreate.id,
            email,
            accessToken,
        };

        return sendResponse(res, 201, "Sign up successfully ...", { data });
    } catch (error) {
        next(error);
    }
};

// -- SIGNIN CONTROLLER --
// @desc         - Signup user
// @route        - POST - /api/v1/auth/sign-in
// @access       - public

export const signInController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // ---- validation check
        if (!email || !password) {
            throw new AppError("Must fill in the required input field..", 400);
        }

        // ---- user exist or not
        const existUser = await User.findOne({ email });
        if (!existUser) {
            throw new AppError("User not exist, Please register..", 409);
        }

        // ---- password check
        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch) {
            throw new AppError("Password not match..", 401);
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
            email,
            accessToken,
        };

        return sendResponse(res, 200, "Sign In successfully ...", { data });
    } catch (error) {
        next(error);
    }
};

// -- FORGET PASSWORD CONTROLLER --
// @desc         - Froget password user
// @route        - POST - /api/v1/auth/forget-password
// @access       - public

export const forgetPassword = async (req, res, next) => {
    try {
        return sendResponse(res, 200, "Forget password work fine ...");
    } catch (error) {
        next(error);
    }
};
