import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon,
  LogOutIcon,
  UserIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/Auth.store";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const isActive = (path) => location.pathname === path;

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LEFT - LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-md">
            <SparklesIcon className="size-5 text-white" />
          </div>

          <div>
            <h1 className="font-bold text-lg tracking-wide">Talent IQ</h1>
            <p className="text-xs text-base-content/60">Code Together</p>
          </div>
        </Link>

        {/* CENTER - NAV LINKS */}
        <div className="hidden md:flex items-center gap-2 bg-base-200/50 px-2 py-1 rounded-xl">

          <Link
            to="/problems"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition
              ${isActive("/problems")
                ? "bg-primary text-primary-content"
                : "hover:bg-base-300 text-base-content/70"}
            `}
          >
            <BookOpenIcon className="size-4" />
            Problems
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition
              ${isActive("/dashboard")
                ? "bg-primary text-primary-content"
                : "hover:bg-base-300 text-base-content/70"}
            `}
          >
            <LayoutDashboardIcon className="size-4" />
            Dashboard
          </Link>

        </div>

        {/* RIGHT - ACTIONS */}
        <div className="flex items-center gap-3">

          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
          >
            {theme === "light" ? (
              <MoonIcon className="size-5" />
            ) : (
              <SunIcon className="size-5" />
            )}
          </button>

          {/* USER DROPDOWN */}
          <div className="dropdown dropdown-end">

            <label tabIndex={0} className="cursor-pointer">
              <div className="avatar">
                <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </div>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-xl w-52 border border-base-300"
            >
              {/* USER INFO */}
              <li className="px-3 py-2 text-sm text-base-content/70">
                {user?.name || "User"}
              </li>

              <div className="divider my-1"></div>

              {/* PROFILE */}
              <li>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2"
                >
                  <UserIcon className="size-4" />
                  Profile
                </button>
              </li>

              {/* LOGOUT */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOutIcon className="size-4" />
                  Logout
                </button>
              </li>

            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;