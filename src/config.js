import { DB_NAME } from "./constant.js";

export const config = {
    CLIENT_URL: process.env.CLIENT_URL,
    CLIENT_LOCAL_URL: process.env.CLIENT_LOCAL_URL,
    MONGO_DB_URI: `${process.env.MONGO_DB_URI}/${DB_NAME}`,
    MONGO_DB_ATLAS_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w46pkek.mongodb.net/${DB_NAME}?appName=Cluster0`,
};
