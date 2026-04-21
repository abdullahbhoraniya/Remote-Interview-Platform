import mongoose from 'mongoose';

import { Env } from './env.js';

export const connectDb=async()=>{
    try{
        if(!Env.DB_URL){
            throw new Error("DB_URL not found in the env var")
        }
    const conn = await mongoose.connect(Env.DB_URL)
    console.log("Connected to the mongodb", conn.connection.host)

    try {
      const usersCollection = conn.connection.db.collection('users');
      const indexes = await usersCollection.indexes();
      const clerkIndex = indexes.find((index) => index.name === 'clerkId_1');
      if (clerkIndex) {
        await usersCollection.dropIndex('clerkId_1');
        console.log('Dropped stale clerkId_1 index from users collection');
      }
    } catch (indexErr) {
      if (indexErr.codeName !== 'IndexNotFound') {
        console.warn('Error checking/dropping stale user index:', indexErr.message);
      }
    }
    }
    catch(err){
        console.error("Error while connecting to db",err);
        process.exit(1)
    }

}