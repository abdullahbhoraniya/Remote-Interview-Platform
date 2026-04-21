import React, { useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Instance } from "../lib/Instance";
import { useNavigate } from "react-router-dom";

const Recruiter = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔥 STEP BASED VALIDATION (ONLY IMPORTANT FIELDS)
  const getValidationSchema = () => {
    if (step === 1) {
      return Yup.object({
        recruiterName: Yup.string().required("Name is required"),
        workEmail: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string()
          .matches(/^[6-9]\d{9}$/, "Invalid phone")
          .required("Phone required"),
        companyName: Yup.string().required("Company required")
      });
    }

    // 🔥 NO VALIDATION FOR STEP 3
    return Yup.object({});
  };

  const validationSchema = useMemo(() => getValidationSchema(), [step]);

  const formik = useFormik({
    initialValues: {
      recruiterName: "",
      workEmail: "",
      phone: "",
      companyName: "",
      companyWebsite: "",
      linkedIn: ""
    },

    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (values) => {
      console.log("SUBMIT TRIGGERED");

      if (!isVerified) {
        setError("Please verify email first");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const payload = {
          recruiterName: values.recruiterName.trim(),
          workEmail: values.workEmail.trim().toLowerCase(),
          phone: values.phone.trim(),
          companyName: values.companyName.trim(),
          companyWebsite: values.companyWebsite?.trim() || null,
          linkedIn: values.linkedIn?.trim() || null
        };

        console.log("FINAL PAYLOAD:", payload);

        const res = await Instance.post("/recruiter/create-recruiter", payload);

        if (res.data.success) {
          setMessage("🎉 Profile completed successfully!");

          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        }

      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  });

  // 🔥 SEND OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await Instance.post("/otp/send-otp", {
        email: formik.values.workEmail
      });

      if (res.data.success) {
        setMessage("✅ OTP sent to your email");
        setStep(2);
      }

    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await Instance.post("/otp/verify-otp", {
        email: formik.values.workEmail,
        otp
      });

      if (res.data.success) {
        setMessage("✅ Email verified successfully");
        setIsVerified(true);
        setStep(3);
      }

    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Recruiter Onboarding
        </h2>

        {/* 🔥 PROGRESS BAR */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span className={step >= 1 ? "text-primary font-semibold" : "text-gray-400"}>Details</span>
            <span className={step >= 2 ? "text-primary font-semibold" : "text-gray-400"}>Verify</span>
            <span className={step >= 3 ? "text-primary font-semibold" : "text-gray-400"}>Complete</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* 🔥 MESSAGE */}
        {message && <p className="text-green-500 text-center mb-3">{message}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <input
                name="recruiterName"
                value={formik.values.recruiterName}
                placeholder="Your Name"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
              />
              <p className="text-red-500 text-sm">{formik.errors.recruiterName}</p>

              <input
                name="workEmail"
                value={formik.values.workEmail}
                placeholder="Work Email"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
              />
              <p className="text-red-500 text-sm">{formik.errors.workEmail}</p>

              <input
                name="phone"
                value={formik.values.phone}
                placeholder="Phone Number"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
              />
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>

              <input
                name="companyName"
                value={formik.values.companyName}
                placeholder="Company Name"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
              />
              <p className="text-red-500 text-sm">{formik.errors.companyName}</p>

              <button
                type="button"
                onClick={handleSendOtp}
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <p className="text-sm text-gray-500 text-center">
                OTP sent to {formik.values.workEmail}
              </p>

              <input
                placeholder="Enter OTP"
                className="input input-bordered w-full"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
                className="btn btn-success w-full"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <input
                name="companyWebsite"
                value={formik.values.companyWebsite}
                placeholder="Company Website (optional)"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
              />

              <input
                name="linkedIn"
                value={formik.values.linkedIn}
                placeholder="LinkedIn Profile (optional)"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
              />

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Complete Profile"}
              </button>
            </>
          )}

        </form>

      </div>
    </div>
  );
};

export default Recruiter;