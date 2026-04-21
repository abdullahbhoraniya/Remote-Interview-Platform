import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/Auth.store";

function AuthRedirect() {
  const navigate = useNavigate();
  const { user, authChecked } = useAuthStore();

 useEffect(() => {
  if (!authChecked) return;

  if (!user) {
    navigate("/login");
    return;
  }

  // Role not selected
  if (!user.role || user.role === "pending") {
    navigate("/select-role");
    return;
  }

  // ------------------ CANDIDATE ------------------
  if (user.role === "candidate") {
    if (!user.profileCompleted) {
      navigate("/candidate/setup");
    } else {
      navigate("/candidate/dashboard");
    }
    return;
  }

  // ------------------ RECRUITER ------------------
  if (user.role === "recruiter") {

    // 🔥 Email not verified
    if (!user.isEmailVerified) {
      navigate("/recruiter/setup"); // you can later create /verify-email page
      return;
    }

    // 🔥 Profile not completed
    if (!user.profileCompleted) {
      navigate("/recruiter/setup");
      return;
    }

    // 🔥 Future: admin approval (not implemented yet)
    if (user.status === "pending") {
      navigate("/recruiter/setup"); // later → /recruiter/pending
      return;
    }

    // ✅ Recruiter ready
    navigate("/recruiter/dashboard"); // later → /recruiter/dashboard
    return;
  }

}, [user, authChecked, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}

export default AuthRedirect;