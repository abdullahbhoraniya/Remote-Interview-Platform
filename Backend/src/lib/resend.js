import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (toEmail, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Talent IQ <onboarding@resend.dev>", // can change later
      to: [toEmail],
      subject: "Verify your email",
      html: `
        <div style="font-family: Arial;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>Valid for 10 minutes</p>
        </div>
      `
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error("Email failed");
    }

    return data;

  } catch (err) {
    console.error("Send Email Error:", err);
    throw err;
  }
};