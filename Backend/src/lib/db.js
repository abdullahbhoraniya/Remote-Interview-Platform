import mongoose from 'mongoose';

import { Env } from './env.js';

export const connectDb=async()=>{
    try{
        if(!Env.DB_URL){
            throw new Error("DB_URL not found in the env var")
        }
    const conn=await mongoose.connect(Env.DB_URL)
    console.log("Connected to the mongodb",conn.connection.host)
    }
    catch(err){
        console.error("Error while connecting to db",err);
        process.exit(1)
    }

}