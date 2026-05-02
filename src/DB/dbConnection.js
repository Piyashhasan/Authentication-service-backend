import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import { config } from "../config.js";

const connectionDB = async () => {
    try {
        // -- use it for Mongo Atlas configuration --
        // const connection = await mongoose.connect(config.MONGO_DB_ATLAS_URI);

        // -- use it for local development configuration --
        const connectionEstablished = await mongoose.connect(
            config.MONGO_DB_URI
        );

        console.log("✅ MongoDB connected");

        return connectionEstablished;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectionDB;
