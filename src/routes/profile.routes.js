import express from "express";
import {
    getUserInfo,
    profileImageUpload,
    profileUpdate,
} from "../controllers/profile.conrollers.js";
import { authenticateUser } from "../middlewares/authenticate.user.middleware.js";

// -- route create --
const profileRoute = express.Router();

// -- api endpoints --
profileRoute
    .get("/info", authenticateUser, getUserInfo)
    .post("/image-upload", authenticateUser, profileImageUpload)
    .post("/info-update", authenticateUser, profileUpdate);

export default profileRoute;
