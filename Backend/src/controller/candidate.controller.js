import { Application } from "../models/Application.js";
import Job from "../models/Job.js";
import mongoose from "mongoose";


export const getJobs = async (req, res) => {
  try {
    console.log("API called");

    let { search, location, minExp, page = 1, limit = 10 } = req.query;

    // 🔥 sanitize inputs
    page = Math.max(1, parseInt(page));
    limit = Math.min(20, Math.max(1, parseInt(limit))); // cap limit (important)

    const skip = (page - 1) * limit;

    let query = { status: "open" };

    // 🔥 search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { skills: { $elemMatch: { $regex: search, $options: "i" } } }
      ];
    }

    // 🔥 filters
    if (location) {
      query.location = { $regex: location, $options: "i" }; // flexible match
    }

    if (minExp) {
      query.experience = { $gte: Number(minExp) };
    }

    // 🔥 parallel queries (important)
    const [jobs, total] = await Promise.all([
      Job.find(query)
        .select("title role location salaryRange experience status") // ✅ projection
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),

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
    console.error("GetJobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching jobs"
    });
  }
};

export const applyJob = async (req, res) => {
  try {
    const candidateId = req.user._id;
    const { jobId } = req.params;

    
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required"
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "Job is no longer accepting applications"
      });
    }

    if (job.recruiterId.toString() === candidateId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot apply to your own job"
      });
    }

    const existingApplication = await Application.findOne({
      jobId,
      candidateId
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job"
      });
    }

    const application = await Application.create({
      jobId,
      candidateId,
      recruiterId: job.recruiterId,
      resumeUrl: req.user.resumeUrl || "", // optional fallback
      status: "applied"
    });

    await Job.findByIdAndUpdate(jobId, {
      $inc: { totalApplications: 1 }
    });

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
      data: application
    });

  } catch (error) {
    console.error("Apply Job Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Id from the frontend is ",id);    
    // 🔴 Validate ID (you always forget this)
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required"
      });
    }

    // 🔴 Check valid Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID"
      });
    }

    // 🔥 Fetch job
    const job = await Job.findById(id);

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
    console.error("GetJobById Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching job"
    });
  }
};

