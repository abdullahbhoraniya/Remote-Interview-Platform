import dotenv from "dotenv";

dotenv.config();


export const Env={
    PORT:process.env.PORT,
    DB_URL:process.env.MONGODB_URL,
    NODE_ENV:process.env.NODE_ENV
}