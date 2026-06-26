import { DB_NAME } from "./constant.js";

// -- process get properly or not check --
const requiredEnvVars = [
    "CLIENT_URL",
    "CLIENT_LOCAL_URL",
    "MONGO_DB_URI",
    "DB_USER",
    "DB_PASS",
    "JWT_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
];

const missingEnvVars = requiredEnvVars.filter((envKey) => !process.env[envKey]);

if (missingEnvVars.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
}

// -- export config file --
export const config = {
    CLIENT_URL: process.env.CLIENT_URL,
    CLIENT_LOCAL_URL: process.env.CLIENT_LOCAL_URL,

    // -- mongo secrete --
    MONGO_DB_URI: `${process.env.MONGO_DB_URI}/${DB_NAME}`,
    MONGO_DB_ATLAS_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w46pkek.mongodb.net/${DB_NAME}?appName=Cluster0`,

    // -- jwt secrete --
    JWT_SECRET: process.env.JWT_SECRET,

    // -- cloudinary secrete --
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
