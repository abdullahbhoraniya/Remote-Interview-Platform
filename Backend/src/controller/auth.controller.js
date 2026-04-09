import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { upsertUserStream } from "../lib/stream.js";
import { generateToken } from "../middleware/auth.middleware.js";

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is Empty",
      });
    }

    const client = new OAuth2Client(process.env.GOOGLE_AUTH_ID_BACKEND);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_ID_BACKEND,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Invalid Google token",
      });
    }

    const { email, name, sub: googleId, picture } = payload;
    console.log("Google Auth Payload:", payload);
    let user = await User.findOne({ email });
    console.log("Existing user:", user);
    if (user) {
      generateToken(user._id, res);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user,
      });
    }
    console.log("Creating new user:", { name, email, googleId, picture });
    const newUser = new User({
      name,
      email,
      googleId,
      profileImage: picture,
    });

    await newUser.save();

    try {
      await upsertUserStream({
        id: newUser._id.toString(),
        name: newUser.name,
        image: newUser.profileImage,
      });
    } catch (err) {
      console.log("Stream sync failed:", err.message);
    }

    generateToken(newUser._id, res);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: newUser,
    });

  } catch (error) {
    console.error("Google Auth Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  return res.status(200).json({
    success: true,
    user: req.user,
  });
};