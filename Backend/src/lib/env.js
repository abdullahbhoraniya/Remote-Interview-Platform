import dotenv from "dotenv";

dotenv.config();


export const Env={
    PORT:process.env.PORT,
    DB_URL:process.env.MONGODB_URL,
    NODE_ENV:process.env.NODE_ENV,
    CLIENT_URL:process.env.CLIENT_URL,
    STREAM_API_KEY:process.env.STREAM_API_KEY,
    STREAM_SECRET_KEY:process.env.STREAM_SECRET_KEY,
}