import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: false,
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        age: {
            type: Number,
            default: null,
        },
        presentAddress: {
            type: String,
            default: null,
        },
        permanentAddress: {
            type: String,
            default: null,
        },
        contact: {
            type: String,
            unique: true,
            default: null,
        },
        avatar: {
            type: String,
            default: null,
        },
        coverAvatar: {
            type: String,
            default: null,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
