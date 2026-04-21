import React, { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bell,
  Search,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useAuthStore } from "../../store/Auth.store";
import CandidateDashBoard from "./dashboard/CandidateHomepage";
import CandidateJobPortal from "./jobPortal/CandidateJobPortal";
import ApplicationHomePage from "./application/ApplicationPage";

const CandidateNavbar = () => {
  const { logout, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const navItemClass = (tab) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg w-full transition ${
      activeTab === tab ? "bg-primary text-primary-content" : "hover:bg-base-200"
    }`;

  return (
    <div className="flex h-screen bg-base-200">

      {/* 🔥 MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <aside
        className={`
          fixed z-50 lg:static top-0 left-0 h-full w-64 bg-base-100 border-r border-base-300
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-base-300 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Talent IQ
            </h1>
            <p className="text-xs text-base-content/60">Candidate Panel</p>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-2">

          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className={navItemClass("dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("jobs")}
            className={navItemClass("jobs")}
          >
            <Briefcase size={18} />
            Jobs
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("applications")}
            className={navItemClass("applications")}
          >
            <FileText size={18} />
            My Applications
          </button>

          {/* <option>
            <select></select>
            <select></select>
          </option> */}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-base-300">
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* 🔥 MAIN */}
      <div className="flex-1 flex flex-col">

        {/* 🔥 TOPBAR */}
        <header className="h-16 bg-base-100 border-b border-base-300 flex items-center justify-between px-4 sm:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* MOBILE MENU */}
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* SEARCH */}
            <div className="hidden sm:flex items-center bg-base-200 px-3 py-2 rounded-lg w-64 md:w-80">
              <Search size={16} className="text-base-content/60" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="bg-transparent outline-none ml-2 w-full text-sm"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* NOTIFICATIONS */}
            <button className="btn btn-ghost btn-circle">
              <Bell size={18} />
            </button>

            {/* PROFILE */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={user?.profileImage}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium hidden md:block">
                {user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* 🔥 CONTENT */}
        <main className="p-4 sm:p-6 overflow-y-auto">
            {activeTab === "dashboard" &&  <CandidateDashBoard/>}

  {activeTab === "jobs" && <CandidateJobPortal/>}

  {activeTab === "applications" && <ApplicationHomePage/>}


        </main>

      </div>
    </div>
  );
};

export default CandidateNavbar;