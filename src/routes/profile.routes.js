import express from "express";
import {
    getUserInfo,
    profileImageUpload,
    profileUpdate,
} from "../controllers/profile.conrollers.js";

// -- route create --
const profileRoute = express.Router();

// -- api endpoints --
profileRoute
    .get("/info", getUserInfo)
    .post("/image-upload", profileImageUpload)
    .post("/info-update", profileUpdate);

export default profileRoute;
