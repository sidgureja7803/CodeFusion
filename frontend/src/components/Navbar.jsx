import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, LogOut, User, Settings } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import gsap from "gsap";

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar entrance animation
      gsap.fromTo(navRef.current,
        { 
          opacity: 0, 
          y: -20
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.nav
      ref={navRef}
      className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                CodeFusion
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-slate-700/50"
                >
                  Dashboard
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/playlists"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-slate-700/50"
                >
                  Playlists
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-slate-700/50"
                >
                  Profile
                </Link>
              </motion.div>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                {/* User Info */}
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Settings Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-all duration-300"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </motion.button>

                {/* Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 rounded-lg transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-slate-700/50">
        <div className="px-4 py-3 space-y-1">
          <Link
            to="/dashboard"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg text-base font-medium transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/playlists"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg text-base font-medium transition-colors duration-300"
          >
            Playlists
          </Link>
          <Link
            to="/profile"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg text-base font-medium transition-colors duration-300"
          >
            Profile
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};
