import { StreamClient } from "@stream-io/node-sdk";
import { StreamChat } from "stream-chat";
import { Env } from "./env.js";

const STREAM_API_KEY = Env.STREAM_API_KEY;
const STREAM_API_SECRET = Env.STREAM_SECRET_KEY;


// ✅ Correct backend client
export const streamClient = new StreamClient(
  STREAM_API_KEY,
  STREAM_API_SECRET
);

export const chatClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET); // will be used chat featur

// ✅ Upsert user
export const upsertUserStream = async (userData) => {
  try {
    await chatClient.upsertUser(
      {
        id: userData.id,
        name: userData.name,
        image: userData.image || "",
      },
    );

    console.log(`User ${userData.id} synced with Stream`);
    return userData;
  } catch (error) {
    console.error("Stream upsert error:", error.message);
    throw error;
  }
};

// ✅ Delete user
export const deleteUserStream = async (userId) => {
  try {
    await chatClient.deleteUser(userId);

    console.log(`User ${userId} deleted from Stream`);
  } catch (error) {
    console.error("Stream delete error:", error.message);
    throw error;
  }
};

