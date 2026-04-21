import Job from "../models/Job.js";
import Recruiter from "../models/recruiter.js";
import User from "../models/User.js";

export const createRecruiter = async (req, res) => {
    try {
        console.log("REQ USER:", req.user);
        const userId = req.user._id;
        console.log("UserId Req", userId);
        const {
            recruiterName,
            workEmail,
            phone,
            companyName,
            companyWebsite,
            linkedIn
        } = req.body;
        console.log(
            "Data from the backend is",
            recruiterName,
            workEmail,
            phone,
            companyName,
            companyWebsite,
            linkedIn
        )
        if (!recruiterName || !workEmail || !phone || !companyName) {
            return res.status(400).json({
                message: "All required fields must be filled"
            });
        }


        const user = await User.findById(userId);


        if (!user || user.role !== "recruiter") {
            return res
                .status(403)
                .json({ message: "Only recruiters can create recruiter profiles" });
        }
        if (
            !user.isEmailVerified ||
            user.verifiedEmail !== workEmail
        ) {
            return res.status(403).json(
                {
                    message: "Email not verified. Please verify your email before creating a recruiter profile."
                }
            )
        }
        const existingRecruiter = await Recruiter.findOne({ workEmail });

        if (existingRecruiter) {
            return res.status(400).json({
                message: "A recruiter profile with this work email already exists."
            });
        }

        const domain = workEmail.split("@")[1];

        const recruiter = await Recruiter.create({
            userId,
            recruiterName,
            workEmail,
            phone,
            company: {
                name: companyName,
                website: companyWebsite,
                domain
            },
            linkedIn,
            status: "pending", // 🔥 admin approval,
            isEmailVerified: true // 🔥 since work email is verified during OTP flow
        });

        return res.status(201).json({
            success: true,
            message: "Recruiter profile created successfully. Awaiting admin approval.",
            data: recruiter
        })
    } catch (error) {

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


//create job
export const createJob = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      title,
      role,
      description,
      skills,
      experience,
      location,
      salaryRange
    } = req.body;

    // 🔥 VALIDATION
    if (!title || !role || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, role and description are required"
      });
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Skills must be a non-empty array"
      });
    }

    if (typeof experience !== "number") {
      return res.status(400).json({
        success: false,
        message: "Experience must be a number"
      });
    }

    // 🔥 CREATE JOB
    const job = await Job.create({
      recruiterId: userId,
      title,
      role,
      description,
      skills,
      experience,
      location: location || "Remote",
      salaryRange: salaryRange || {},
    });

    // 🔥 RESPONSE
    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job
    });

  } catch (error) {
    console.error("Create Job Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};