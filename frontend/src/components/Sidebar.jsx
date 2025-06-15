import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

export const Sidebar = () => {
  const { logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <div className="sidebar-header">
          <h3 className="text-xl dark:text-white text-black neue-med">
            Quick Access
          </h3>
        </div>
        <div className="sidebar-content">
          <Link to="/dashboard">
            <div className="sidebar-item">
              <span className="sidebar-icon">🏠</span>
              <span className="sidebar-text">Home</span>
            </div>
          </Link>
          <Link to="/profile">
            <div className="sidebar-item">
              <span className="sidebar-icon">👤</span>
              <span className="sidebar-text">Profile</span>
            </div>
          </Link>

          <Link to="/playlists">
            <div className="sidebar-item">
              <span className="sidebar-icon">📚</span>
              <span className="sidebar-text">Playlists</span>
            </div>
          </Link>

          <Link to="/revision">
            <div className="sidebar-item">
              <span className="sidebar-icon">📋</span>
              <span className="sidebar-text">Saved Problems</span>
            </div>
          </Link>
        </div>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout">
            <span className="sidebar-icon">🚪</span>
            <span className="sidebar-text">Logout</span>
          </button>
        </div>
      </div>

      <div
        className={`sidebar-trigger ${sidebarOpen ? "hidden-trigger" : ""}`}
        onMouseEnter={() => setSidebarOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="pr-1"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="square"
            strokeMiterlimit="10"
            strokeWidth="48"
            d="M180 112l144 144-144 144"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="square"
            strokeMiterlimit="10"
            strokeWidth="48"
            d="M312 112l144 144-144 144"
          />
        </svg>
      </div>
    </div>
  );
};

export default Sidebar;
