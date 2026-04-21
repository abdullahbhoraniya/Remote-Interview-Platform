import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});

    res.cookie(
        "token",
        token,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }
    )
}

export const protectedRoute = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Auth error:", {
        name: error.name,
        message: error.message
    });

    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
    }

    if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
    }

    // fallback → unexpected error
    return res.status(500).json({ message: "Internal server error" });
    }
};