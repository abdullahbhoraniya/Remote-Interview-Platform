import { Application } from "../models/Application.js";
import Job from "../models/Job.js";


export const getJobs = async (req, res) => {
    try {
        const { search, location, minExp, page = 1, limit = 10 } = req.query;
        let query = { status: "open" };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { skills: { $elemMatch: { $regex: search, $options: "i" } } }
            ]
        }

        if (location) {
            query.location = location;
        }
        if (minExp) {
            query.experience = { $gte: Number(minExp) };
        }
        const skip = (page - 1) * limit;
        const jobs = await Job.find(query)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        return
        res
        .status(201)
        .json({
        success: true,
        data: jobs
    })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching jobs"
        });
    }
}

 console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching jobs"
    });


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