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
import gsap from "gsap";
import { Code2, Users, Zap, TrendingUp, Calendar, Star } from "lucide-react";

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
  const dashboardRef = useRef(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background gradient
      gsap.to(".dashboard-bg", {
        backgroundPosition: "200% 200%",
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -15,
        rotation: 3,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 1.5
      });

      // Cards entrance animation
      gsap.fromTo(".dashboard-card",
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          stagger: 0.1,
          ease: "power2.out"
        }
      );

    }, dashboardRef);

    return () => ctx.revert();
  }, []);

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

  const stats = [
    {
      title: "Projects",
      value: "12",
      change: "+3 this week",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Collaborators",
      value: "8",
      change: "+2 new",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Lines of Code",
      value: "2.4k",
      change: "+15% this month",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Streak",
      value: "7 days",
      change: "Keep it up!",
      icon: <Zap className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const recentProjects = [
    {
      name: "E-commerce Platform",
      language: "React",
      collaborators: 3,
      lastActive: "2 hours ago",
      status: "active"
    },
    {
      name: "API Gateway",
      language: "Node.js",
      collaborators: 2,
      lastActive: "1 day ago",
      status: "review"
    },
    {
      name: "Mobile App",
      language: "React Native",
      collaborators: 4,
      lastActive: "3 days ago",
      status: "completed"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'review': return 'text-yellow-400 bg-yellow-400/20';
      case 'completed': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" ref={dashboardRef}>
      {/* Animated Background */}
      <div className="dashboard-bg absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
           style={{
             backgroundSize: "400% 400%",
             backgroundImage: "linear-gradient(-45deg, #0f172a, #1e3a8a, #312e81, #1e293b, #0f172a)"
           }}>
        
        {/* Floating elements */}
        <div className="floating-element absolute top-20 left-16 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-lg"></div>
        <div className="floating-element absolute bottom-32 left-32 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl"></div>
        <div className="floating-element absolute bottom-48 right-16 w-28 h-28 bg-pink-500/10 rounded-full blur-lg"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
              Welcome back, {authUser?.name || 'Developer'}! 👋
            </h1>
            <p className="text-gray-400">
              Ready to continue your coding journey? Let's build something amazing together.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="dashboard-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.title}</div>
                  </div>
                </div>
                <div className="text-sm text-green-400">{stat.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <div className="lg:col-span-2">
              <motion.div
                className="dashboard-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    New Project
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{project.name}</div>
                          <div className="text-sm text-gray-400">{project.language} • {project.collaborators} collaborators</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">{project.lastActive}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              {/* AI Assistant */}
              <motion.div
                className="dashboard-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Get intelligent code suggestions and debugging help powered by advanced AI.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  Start Coding with AI
                </motion.button>
              </motion.div>

              {/* Activity Calendar */}
              <motion.div
                className="dashboard-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Activity</h3>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {Array.from({ length: 35 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${
                        Math.random() > 0.7 
                          ? 'bg-green-500' 
                          : Math.random() > 0.5 
                          ? 'bg-green-300' 
                          : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-400 text-xs">
                  7 day coding streak! Keep it up! 🔥
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <CreatePlaylistModal
        isOpen={isCreatePlaylistModalOpen}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};
