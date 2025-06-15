import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "../components/Loader";
import Sidebar from "../components/Sidebar";
import ProblemTable from "../components/ProblemTable";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import "../styles/Dashboard.css";
import { usePlaylistStore } from "../store/usePlaylistStore";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

// Function to get formatted date string
const getFormattedDateTime = () => {
  const greeting = getGreeting();
  const date = new Date();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = dayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  return `${greeting} • ${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
};

export const Dashboard = () => {
  const { getProblems, problems, isProblemsLoading } = useProblemStore();
  const { createPlaylist } = usePlaylistStore();
  const { authUser } = useAuthStore();
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
    useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(
    getFormattedDateTime()
  );
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    // Update the datetime every minute
    const intervalId = setInterval(() => {
      setCurrentDateTime(getFormattedDateTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        e.key.toLowerCase() === "c" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey // Avoid shortcuts like Ctrl+C
      ) {
        setIsCreatePlaylistModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    getProblems();
  }, [getProblems]);

  const handleCreatePlaylist = async (playlistData) => {
    const result = await createPlaylist(playlistData);
  };

  const handleProblemDeleted = () => {
    // Refresh the problems list after deletion
    getProblems();
  };

  if (isProblemsLoading) {
    return (
      <div className="min-h-screen dashboard-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen dashboard-container" ref={sectionRef}>
      {/* Sidebar */}
      <Sidebar />

      <div className="max-w-[1200px] mx-auto">
        <Navbar />

        {/* profile pic whith intials of the user  */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "backInOut" }}
          className="dash-card mt-2 w-full flex items-start gap-4 justify-start"
        >
          <div className="sm:w-36 sm:h-36 relative overflow-hidden w-0 h-0 rounded-lg dark:bg-[#0001] bg-[#fff1] pfp transition-all duration-300 ease-in-out">
            <span className="absolute -bottom-6 right-0 text-9xl">
              {authUser?.name
                ? authUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl text-black dark:text-white neue-med">
              Welcome Back, {authUser?.name} ✨
            </h3>
            <p className="text-base text-black dark:text-white neue-reg">
              {currentDateTime}
            </p>
            <p className="text-sm text-black/80 dark:text-white/80 neue-reg mb-2">
              {authUser?.email} <br />
            </p>
            <button
              onClick={() => {
                setIsCreatePlaylistModalOpen(true);
              }}
              className="text-sm text-black/80 dark:text-white/80 dark:bg-[#ffffff2a] bg-[#0000002a] font-mono tracking-tighter uppercase hover:text-red-700 dark:hover:text-red-500 hover:bg-[#ffffff5e] dark:hover:bg-[#0e0e0e5e] duration-200 ease-out cursor-pointer w-fit"
            >
              <span>[C]</span> Create Playlist
            </button>
          </div>
        </motion.div>

        {/* Problems Table */}
        {problems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "backInOut" }}
            className="dash-card mt-2"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl text-white text-center neue-med">
                No Problems Found
              </h3>
            </div>
          </motion.div>
        ) : (
          <ProblemTable
            problems={problems}
            onProblemDeleted={handleProblemDeleted}
          />
        )}
      </div>

      <CreatePlaylistModal
        isOpen={isCreatePlaylistModalOpen}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};