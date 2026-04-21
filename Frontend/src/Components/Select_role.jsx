import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserIcon, BriefcaseIcon } from "lucide-react";
import { roleSelectionApi } from '../api/role_selection';
import { useAuthStore } from '../store/Auth.store';

function Select_role() {
  const navigate = useNavigate();
  const { loadAuth } = useAuthStore();

  const handleSelect = async (role) => {
    try {
      const roleApi = roleSelectionApi
      const data=await roleApi.roleSelection(role);

      await loadAuth();
      navigate('/auth-redirect');

      // backend should send redirect path
      console.log("Role selection response:", data);

    } catch (error) {
      console.error("Error setting role:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center px-4">

      <div className="max-w-4xl w-full text-center space-y-10">

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Choose Your Role
          </h1>
          <p className="text-base-content/70 mt-2">
            How do you want to use Talent IQ?
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Candidate */}
          <div
            onClick={() => handleSelect("candidate")}
            className="cursor-pointer group p-8 rounded-2xl bg-base-100/40 backdrop-blur-xl border border-primary/20 shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="size-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <UserIcon className="size-8 text-primary" />
            </div>

            <h2 className="text-2xl font-bold">Candidate</h2>
            <p className="text-base-content/70 mt-2">
              Practice interviews and get hired
            </p>
          </div>

          {/* Recruiter */}
          <div
            onClick={() => handleSelect("recruiter")}
            className="cursor-pointer group p-8 rounded-2xl bg-base-100/40 backdrop-blur-xl border border-secondary/20 shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="size-16 mx-auto mb-4 rounded-xl bg-secondary/10 flex items-center justify-center">
              <BriefcaseIcon className="size-8 text-secondary" />
            </div>

            <h2 className="text-2xl font-bold">Recruiter</h2>
            <p className="text-base-content/70 mt-2">
              Hire candidates and conduct interviews
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Select_role;