import { generateRandomString } from "../lib/randomString.js";
import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export const createSession = async (req, res) => {
    try {
        const { problem, difficulty } = req.body;

        console.log("Session data from the backend is",problem , difficulty);

        const userId = req.user._id;

        if (!problem || !difficulty) {
            return res.status(400).json({ message: "Problem and difficulty are required" });
        }

        const callId = generateRandomString();

        const session = await Session.create({
            problem, difficulty, host: userId, callId
        })
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: userId.toString(),
                custom: {
                    problem, difficulty, sessionId: session._id.toString()
                }
            }
        })

        const channel = chatClient.channel("messaging", callId, {
            created_by_id: callId,
            members: []

        })
        await channel.create();
        res.status(200).json({
            success:true,
            session:session
        })
    } catch (error) {
        console.error("The error is related to",error);
        throw error;
    }

};

import mongoose from "mongoose";

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    const session = await Session.findById(id)
      .populate('host', 'name profileImage email _id')
      .populate('participant', 'name profileImage email _id');

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    return res.status(200).json({ session });

  } catch (error) {
    console.log("Error fetching session by id", error);
    return res.status(500).json({ message: "Error fetching session details" });
  }
};

export const getMyRecentSession = async (req, res) => {
    try {
        const userId = req.user._id;

        const sessions = await Session.find({ $or: [{ host: userId }, { participant: userId }] })
            .populate('host', 'name profileImage email -_id')
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            sessions
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching recent sessions" })
    }
};

export const getActiveSession = async (req, res) => {
    try {
        const session = await Session.find({ status: 'active' })
            .populate('host', 'name profileImage email -_id')
            .populate('participant', 'name profileImage email -_id')
            .sort({ createdAt: -1 })
            .limit(10);
        res.status(200).json({ sessions: session })
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching active sessions" })
    }
};

export const joinSession = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const session = await Session.findById(id);
        if (!session) {
            return res.status(404).json({ message: "Session not found" })
        }
        if(session.status !== "active"){
            return res.status(400).json({ message: "Session is not active" })
        }
        if(session.host.toString() === userId.toString()){
            return res.status(400).json({ message: "Host cannot join as participant" })
        }
        if (session.participant) {
            return res.status(409).json({ message: "Session is already full" })
        }
        session.participant = userId;
        await session.save();

        const channel = chatClient.channel('messaging', session.callId);
        await channel.addMembers([userId.toString()])
    } catch (error) {

    }
};

export const leaveSession = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const session = await Session.findById(id);

        if (!session) {
            return res.status(400).json({ message: "Session not found" })
        }
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Only hpst can end the session" })
        } 
            if (session.status === "completed") {
                return res.status(400).json({ message: "Session already completed" });
            }
            session.status = "completed";
            await session.save();

            const call=streamClient.video.call("default",session.callId);
            await call.end({hard:true});

            const channel=chatClient.channel("messaging",session.callId);
            await channel.delete();

            session.status="completed";
            await session.save();

            res.status(200).json({message:"Session ended successfully"})
    }
    catch (error) {
        console.log("Error while ending the session",error);
        return res.status(400).json({message:"An error is occured while endind the session"})

        }
}