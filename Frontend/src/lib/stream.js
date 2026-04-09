import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;

export const getStreamClient = async (user, token) => {
    if (client && client?.user?.id === user.id) return client;

    if (!apiKey) throw new Error("Stream API key is not defined in environment variables");

    client = new StreamVideoClient({
        apiKey,
        user,
        token
    })
    return client;

}

export const disconnectStreamClient = async () => {
    try {
        if (client) {
            await client.disconnectUser();
            client = null;
        }
    }
    catch (err) {
        console.error("Error while disconnecting the stream client", err);
    }
}