import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/images/logo2.png";
import { useStreak } from "../store/useStreak";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Switch from "./Switch";

export const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const isAdmin = authUser?.role === "ADMIN";
  const navigate = useNavigate();
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const { currentStreak } = useStreak(submissions);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.altKey && (e.key === "a" || e.key === "A")) {
        if (isAdmin) {
          e.preventDefault(); // prevent default browser behavior if needed
          navigate("/add-problem");
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [navigate, isAdmin]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };
  return (
    <nav>
      <motion.nav
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "backInOut" }}
        className="navbar flex justify-between items-center px-3 py-2"
      >
        <Link to="/dashboard">
          <div className="flex items-center gap-4">
            <div className="logo w-[50px] h-auto z-50">
              <img src={logo} alt="logo" />
            </div>
            <h1 className="text-lg  nulshock">Arkham Labs</h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Switch />
          <p className="text-sm  neue-reg">
            {!isAdmin && (
              <span className="neue-reg">{currentStreak} day streak 🔥</span>
            )}
          </p>
          {isAdmin && (
            <Link
              to="/add-problem"
              className="add-btn  px-4 py-2 neue-med rounded-md transition duration-300 ease-in-out text-sm"
            >
              [Alt+A] &nbsp; Add Problem
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg neue-med hover:bg-red-500/50 transition-all  text-sm"
          >
            Logout
          </button>
        </div>
      </motion.nav>
    </nav>
  );
};
