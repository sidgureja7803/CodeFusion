import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Mail, 
  User, 
  Shield, 
  Edit, 
  Calendar,
  Github,
  Linkedin,
  FileText,
  UserCheck,
  ExternalLink
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import EditProfileModal from "../components/EditProfileModal";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import "../styles/Profile.css";
import UserStats from "../components/UserStats";
import SubmissionHeatmap from "../components/SubmissionHeatmap";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const { authUser } = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return null;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  if (!authUser) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Navbar />
      <Sidebar />
      
      {/* Header with back button */}
      <motion.div
        className="profile-header w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="bg-opacity-20 backdrop-blur-sm hover:bg-blue-500/20 p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold neue-med bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Profile Settings
            </h1>
          </div>
          
          {/* Edit button */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsEditModalOpen(true)}
              className="profile-btn profile-btn-primary flex items-center gap-2 px-4 py-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit size={16} /> Edit Profile
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div className="flex items-start justify-start gap-6 mt-6">
        {/* Profile Card */}
        <motion.div variants={itemVariants} className="profile-card w-full max-w-md">
          {/* Profile Header */}
          <div className="flex flex-col items-center gap-6 mb-6">
            {/* Avatar */}
            <motion.div className="profile-avatar">
              <div className="w-24 h-24 relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 pfp transition-all duration-300 ease-in-out flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {authUser?.name
                    ? authUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </span>
              </div>
            </motion.div>

            {/* Name and Role */}
            <div className="text-center">
              <h2 className="text-2xl font-bold neue-med bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                {authUser.name || "Anonymous User"}
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="neue-reg text-sm text-slate-400 uppercase tracking-wider">
                  {authUser.role}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-divider"></div>

          {/* Profile Information Grid */}
          <div className="space-y-4">
            {/* Email */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="neue-reg text-sm text-slate-400">Email</span>
              </div>
              <div className="neue-med text-sm break-all text-slate-200">
                {authUser.email}
              </div>
            </motion.div>

            {/* Gender */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="w-4 h-4 text-purple-400" />
                <span className="neue-reg text-sm text-slate-400">Gender</span>
              </div>
              <div className="neue-med text-sm text-slate-200">
                {authUser.gender ? authUser.gender.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : "Not specified"}
              </div>
            </motion.div>

            {/* Date of Birth */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="neue-reg text-sm text-slate-400">Date of Birth</span>
              </div>
              <div className="neue-med text-sm text-slate-200">
                {authUser.dateOfBirth ? (
                  <div>
                    {new Date(authUser.dateOfBirth).toLocaleDateString()}
                    {calculateAge(authUser.dateOfBirth) && (
                      <span className="text-slate-400 ml-2">
                        (Age: {calculateAge(authUser.dateOfBirth)})
                      </span>
                    )}
                  </div>
                ) : (
                  "Not specified"
                )}
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-4 h-4 text-yellow-400" />
                <span className="neue-reg text-sm text-slate-400">Bio</span>
              </div>
              <div className="neue-med text-sm text-slate-200">
                {authUser.bio || "No bio added yet"}
              </div>
            </motion.div>

            {/* GitHub Profile */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <Github className="w-4 h-4 text-gray-400" />
                <span className="neue-reg text-sm text-slate-400">GitHub Profile</span>
              </div>
              <div className="neue-med text-sm text-slate-200">
                {authUser.githubProfile ? (
                  <a
                    href={authUser.githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {authUser.githubProfile.replace('https://github.com/', '@')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  "Not specified"
                )}
              </div>
            </motion.div>

            {/* LinkedIn Profile */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span className="neue-reg text-sm text-slate-400">LinkedIn Profile</span>
              </div>
              <div className="neue-med text-sm text-slate-200">
                {authUser.linkedinProfile ? (
                  <a
                    href={authUser.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View LinkedIn Profile
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  "Not specified"
                )}
              </div>
            </motion.div>

            {/* User ID */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="neue-reg text-sm text-slate-400">User ID</span>
              </div>
              <div className="neue-med text-xs break-all text-slate-300 font-mono">
                {authUser.id}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Components Section */}
        <motion.div
          className="profile-component-section mx-auto flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <UserStats />
          <SubmissionHeatmap />

          <motion.div variants={itemVariants}>
            <ProblemSolvedByUser />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ProfileSubmission />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </div>
  );
};

export default Profile;