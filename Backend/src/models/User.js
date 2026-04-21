import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  profileImage: {
    type: String,
    default: ""
  },

  role: {
    type: String,
    enum: ['candidate', 'recruiter', 'pending'],
    default: 'pending'
  },

  profileCompleted: {
    type: Boolean,
    default: false
  },

  // 🔥 ADD THIS (for OTP flow)
  isEmailVerified: {
    type: Boolean,
    default: false
  },

  verifiedEmail: {
    type: String
  }

}, { timestamps: true });

const User = mongoose.model("User", userschema);

export default User;