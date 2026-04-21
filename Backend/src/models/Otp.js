import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    trim: true
  },

  otp: {
    type: String,
    required: true
  },

  expiresAt: {
    type: Date,
    required: true
  },

  attempts: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

/**
 * 🔥 Auto-delete expired OTPs
 * MongoDB TTL index
 */
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTP = mongoose.model("OTP", otpSchema);