import { StreamChat } from 'stream-chat';
import { sessionApi } from '../api/session';
import { useEffect, useState } from 'react';
import { disconnectStreamClient, getStreamClient } from '../lib/stream';
import toast from 'react-hot-toast';



const useStream = (session, loadingSession, isHost, isParticipant) => {
    const [streamClient, setStreamClient] = useState(null);
    const [call, setCall] = useState(null);
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [isInitStream, setIsInitStream] = useState(false);

    useEffect(() => {
  let videoCall = null;
  let chatClient = null;

  const initCall = async () => {
    if (!session?.callId) return;
    if (!isHost && !isParticipant) return;

    try {
      setIsInitStream(true);

      const { token, userId, userName, userImage } =
        await sessionApi.getStreamTokeb();

      const client = await getStreamClient(
        {
          id: userId,
          name: userName,
          image: userImage,
        },
        token
      );

      setStreamClient(client);

      videoCall = client.call("default", session.callId);
      await videoCall.join({ create: true });

      setCall(videoCall);

      const apikey = import.meta.env.VITE_STREAM_API_KEY;
      chatClient = StreamChat.getInstance(apikey);

      await chatClient.connectUser({
        id: userId,
        name: userName,
        image: userImage,
      },token);

      setChatClient(chatClient);

      const chatChannel = chatClient.channel("messaging", session.callId);
      await chatChannel.watch();

      setChannel(chatChannel);

    } catch (error) {
      console.log("Error joining video call", error);
      toast.error("Failed to join video call");
    } finally {
      setIsInitStream(false);
    }
  };

  if (session && !loadingSession) initCall();

  return () => {
    (async () => {
      try {
        if (videoCall) await videoCall.leave();
        if (chatClient) await chatClient.disconnectUser();
        await disconnectStreamClient();
      } catch (error) {
        console.error("Cleanup error:", error);
      }
    })();
  };
}, [session, loadingSession, isHost, isParticipant]);

    return(
        {
            streamClient,
            call,
            chatClient,
            channel,
            isInitStream
        }
    )
}

export default useStream;