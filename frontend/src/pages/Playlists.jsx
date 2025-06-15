import React from "react";
import PlaylistProfile from "../components/PlaylistProfile";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import "../styles/Playlists.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Playlists = () => {
  return (
    <div className="dashboard-container min-h-screen mx-auto">
      <div className="max-w-[1200px] mx-auto">
        <Navbar />
        <Sidebar />
        <div className="my-4">
          <Link
            to="/dashboard"
            className="dark:text-white/80 text-black/80 dark:hover:text-white hover:text-black  transition-all duration-300 ease-in-out flex items-center gap-2 mb-4 neue-reg"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="gradient-text text-4xl neue-med font-bold text-center">
            Your Playlists
          </h1>
        </div>

        <PlaylistProfile />
      </div>
    </div>
  );
};

export default Playlists;
