import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    skills: [
      {
        type: String,
        required: true,
        trim: true
      }
    ],

    experience: {
      type: Number,
      required: true,
      min: 0
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    // ✅ FIXED SALARY STRUCTURE
    salaryRange: {
      min: {
        type: Number,
        required: true,
        min: 0
      },
      max: {
        type: Number,
        required: true,
        min: 0
      }
    },

    status: {
      type: String,
      enum: ["open", "close"],
      default: "open"
    },

    totalApplication: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Indexing (good, keep it)
jobSchema.index({ recruiterId: 1 });
jobSchema.index({ status: 1 });

const Job = mongoose.model("jobCollection", jobSchema);
export default Job;