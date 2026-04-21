import { sendEmail } from "../lib/resend.js";
import { OTP } from "../models/Otp.js";
import User from "../models/User.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Requested Email",email)
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const invalidDomains = ["yahoo.com", "hotmail.com", "outlook.com"];
    const domain = email.split("@")[1];

    if (invalidDomains.includes(domain)) {
      return res.status(400).json({
        message: "Use company email"
      });
    }

    const existing = await OTP.findOne({ email });

    if (existing && existing.expiresAt > new Date()) {
      return res.status(400).json({
        message: "OTP already sent. Try later"
      });
    }

    const otp = generateOtp();
    console.log("Generated otp",otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 🔥 SEND EMAIL FIRST
    const result = await sendEmail(email, otp);
    
    console.log("Email status after send",result)
    // optional check
if (!result || !result.id) {
  return res.status(500).json({
    message: "Failed to send OTP"
  });
}

    // 🔥 THEN SAVE OTP
    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
      expiresAt
    });

    return res.status(200).json({
        success:true, 
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};



export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userId = req.user._id;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required"
      });
    }

    const record = await OTP.findOne({ email });

    if (!record) {
      return res.status(400).json({
        message: "OTP expired or not found"
      });
    }

    if (record.attempts >= 5) {
      return res.status(403).json({
        message: "Too many attempts"
      });
    }

    if (record.otp !== otp) {
      record.attempts += 1;
      await record.save();

      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // ✅ SUCCESS

    await OTP.deleteMany({ email });

    // 🔥 THIS IS THE KEY FIX
    await User.findByIdAndUpdate(userId, {
      profileCompleted:true,
      isEmailVerified: true,
      verifiedEmail: email
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};