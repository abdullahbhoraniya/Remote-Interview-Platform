import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    resumeUrl: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "applied",
        "shortlisted",
        "interview",
        "selected",
        "rejected"
      ],
      default: "applied"
    },

    score: {
      type: Number, // from coding round
      default: 0
    },

    notes: {
      type: String // recruiter notes
    }
  },
  { timestamps: true }
);

// 🔥 prevent duplicate applications
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);