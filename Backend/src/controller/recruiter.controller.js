import { createSharedLocationCompositionMiddleware } from "stream-chat";
import Job from "../models/Job.js";
import Recruiter from "../models/recruiter.js";
import User from "../models/User.js";
import mongoose from "mongoose";

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

    // 🔥 BASIC VALIDATION
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

    if (typeof experience !== "number" || isNaN(experience)) {
      return res.status(400).json({
        success: false,
        message: "Experience must be a valid number"
      });
    }

    // 🔥 SALARY VALIDATION (THIS WAS MISSING)
    if (
      !salaryRange ||
      typeof salaryRange.min !== "number" ||
      typeof salaryRange.max !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Salary range must have min and max numbers"
      });
    }

    if (salaryRange.min > salaryRange.max) {
      return res.status(400).json({
        success: false,
        message: "Min salary cannot be greater than max salary"
      });
    }

    // 🔥 CHECK RECRUITER PROFILE EXISTS
    const recruiter = await Recruiter.findOne({ userId });

    if (!recruiter) {
      return res.status(403).json({
        success: false,
        message: "Create recruiter profile first"
      });
    }

    // 🔥 OPTIONAL: enforce approval
    if (recruiter.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Recruiter not approved yet"
      });
    }

    // 🔥 CREATE JOB
    const job = await Job.create({
      recruiterId: recruiter._id, // ✅ correct reference
      title,
      role,
      description,
      skills,
      experience,
      location: location || "Remote",
      salaryRange
    });

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

export const getMyJobs = async (req, res) => {
  try {
    const userId = req.user._id;

    // 🔐 find recruiter profile
    const recruiter = await Recruiter.findOne({ userId }).select("_id status");
    if (!recruiter) {
      return res.status(403).json({
        success: false,
        message: "Recruiter profile not found"
      });
    }

    let { page = 1, limit = 10, status } = req.query;

    // sanitize
    page = Math.max(1, parseInt(page));
    limit = Math.min(20, Math.max(1, parseInt(limit)));
    const skip = (page - 1) * limit;

    const query = { recruiterId: recruiter._id };
    if (status) query.status = status; // open / close

    const [jobs, total] = await Promise.all([
      Job.find(query)
        .select("title role location salaryRange experience status totalApplication createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Job.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      data: jobs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("getMyJobs Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching jobs"
    });
  }
};

export const getMyJobById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID"
      });
    }

    const recruiter = await Recruiter.findOne({ userId }).select("_id");
    if (!recruiter) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const job = await Job.findOne({
      _id: id,
      recruiterId: recruiter._id
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: job
    });

  } catch (error) {
    console.error("getMyJobById Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching job"
    });
  }
};


export const updateJob = async (req, res) => {
  try {
    console.log("Api called");
    const userId = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID"
      });
    }

    const recruiter = await Recruiter.findOne({ userId }).select("_id");
    if (!recruiter) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const {
      title,
      role,
      description,
      skills,
      experience,
      location,
      salaryRange,
      status
    } = req.body;

    // 🔥 validate minimal
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

    if (typeof experience !== "number" || isNaN(experience)) {
      return res.status(400).json({
        success: false,
        message: "Invalid experience"
      });
    }

    if (
      !salaryRange ||
      typeof salaryRange.min !== "number" ||
      typeof salaryRange.max !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid salary range"
      });
    }

    if (salaryRange.min > salaryRange.max) {
      return res.status(400).json({
        success: false,
        message: "Min salary cannot exceed max"
      });
    }

    const job = await Job.findOneAndUpdate(
      {
        _id: id,
        recruiterId: recruiter._id
      },
      {
        title,
        role,
        description,
        skills,
        experience,
        location,
        salaryRange,
        ...(status && { status })
      },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or unauthorized"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job
    });

  } catch (error) {
    console.error("updateJob Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating job"
    });
  }
};