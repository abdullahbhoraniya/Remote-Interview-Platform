import cloudinary from "../lib/cloudinary.js";
import { Profile } from "../models/profile.js";
import User from "../models/User.js";

export const setRole = async (req, res) => {
    console.log("Set Role EndPoint Hit");
    const { role } = req.body;
    if (!role || !['candidate', 'recruiter'].includes(role)) {
        return res.status(400).json({
            success: false,
            message: "Invalid role selected"
        })
    }
    try {
        const userId = req.user._id;
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { role } },
            { new: true }
        );
        return res.status(200).json(
            {
                success: true,
                message: "Role Updated SuccessFully"
            }
        )
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating the role"
        })
    }
}


export const completeProfile = async (req, res) => {
    try {
        let resumeUrl;
        console.log("File", req.file)
        const userId = req.user._id;
        console.log("User ID from Token:", userId);
        const { skills, experience, linkedin } = req.body;

        const graduationYear = Number(req.body.graduationYear);

        const degree = req.body.degree?.trim();
        const branch = req.body.branch?.trim();
        const college = req.body.college?.trim();

        if (!degree || !branch || !college || !graduationYear) {
            return res.status(400).json({ success: false, message: "All education fields are required" });
        }

        if (
            graduationYear < 1950 ||
            graduationYear > new Date().getFullYear() + 5
        ) {
            return res.status(400).json({ success: false, message: "Invalid graduation year" });
        }

        // ✅ enforce resume (recommended)
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume is required"
            });
        }
        console.log("Entire Data Received in Backend:", {
            skills,
            experience,
            linkedin,
            degree,
            branch,
            college,
            graduationYear
        });
        // 🔥 upload using stream
        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "raw",
                    folder: "resumes",
                    public_id: `resume_${userId}_${Date.now()}`
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            stream.end(req.file.buffer);
        });

        resumeUrl = uploadResponse.secure_url;
        console.log("Resume uploaded to Cloudinary:", resumeUrl);

        // 🔥 check existing profile
        const existingProfile = await Profile.findOne({ userId });

        if (existingProfile) {
            console.log("Profile already exists for user:", userId);
            return res.status(400).json({
                success: false,
                message: "Profile already exists"
            });
        }

        // 🔥 fix skills array
        const formattedSkills = Array.isArray(skills)
            ? skills
            : [skills];

        // 🔥 create profile
        const profile = await Profile.create({
            userId,
            skills: formattedSkills,
            experience,
            education: {
                degree,
                branch,
                college,
                graduationYear
            },
            linkedin,
            resumeUrl
        });

        const user=await User.findByIdAndUpdate(userId,{$set:{profileCompleted:true}},{new:true})
        
        return res.status(200).json({
            success: true,
            message: "Profile Completed Successfully",
            data: profile,
            userData:user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating the profile"
        });
    }
};