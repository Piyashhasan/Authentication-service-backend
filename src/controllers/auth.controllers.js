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
// @access       - private
// @error handle - throw new AppError("...message ...", status code (401));
// @res handle   - return sendResponse(res, 404, "Routes Not Found ...!", {});

export const signUpController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // -- validation check --
        if (!name || !email || !password) {
            throw new AppError("Must fill in the required input field..", 400);
        }

        // -- user exist --
        const existUser = await User.findOne({ email });
        if (existUser) {
            throw new AppError("User alreay exist, Please login..", 409);
        }

        // -- create user --
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const userCreate = await User.create({
            name,
            email,
            password: hashPassword,
        });

        if (!userCreate) {
            throw new AppError("Failed to create user..", 500);
        }

        // -- generate refreshToken & accessToken --
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

        // -- Set refresh token in HttpOnly cookie --
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });

        // -- res data --
        const data = {
            userId: userCreate.id,
            email,
            accessToken,
        };

        return sendResponse(res, 200, "Sign up successfully ...", { data });
    } catch (error) {
        next(error);
    }
};

// -- SIGNIN CONTROLLER --
// @desc         - Signup user
// @route        - POST - /api/v1/auth/sign-in
// @access       - private
// @error handle - throw new AppError("User already exists", 401);
// @res handle   - return sendResponse(res, 404, "Routes Not Found ...!",{});

export const signiNController = async (req, res, next) => {
    try {
        return sendResponse(res, 200, "Sign In work fine ...", {});
    } catch (error) {
        next(error);
    }
};
