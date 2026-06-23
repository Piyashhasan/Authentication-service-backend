import express from "express";
import {
    profileImageUpload,
    profileUpdate,
} from "../controllers/profile.conrollers.js";

// -- route create --
const profileRoute = express.Router();

// -- api endpoints --
profileRoute
    .get("/info", profileUpdate)
    .post("/image-upload", profileImageUpload)
    .post("/info-update", profileUpdate);

export default profileRoute;
