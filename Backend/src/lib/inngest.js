import {Inngest} from 'inngest';
import { connectDb } from './db.js';
import User from '../models/User.js';

export const inngest = new Inngest({ id: "my-app" });

const syncUser=inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDb();

    const {id,first_name,last_name,email_addresses,image_url}=event.data;

    const newuser={
        clerkId:id,
        email:email_addresses[0]?.email_address,
        name :`${first_name} ${last_name}`,
        profileImage:image_url
    }
    await User.create(newuser)
}
)
const deleteUserFromDb=inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDb();

    const {id}=event.data;

    
    await User.deleteOne({clerkId:id})
}
)

export const functions=[syncUser,deleteUserFromDb]