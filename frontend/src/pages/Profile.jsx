import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Mail, 
  User, 
  Shield, 
  Edit, 
  Save, 
  X, 
  Calendar,
  Github,
  Linkedin,
  FileText,
  UserCheck,
  ExternalLink
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../libs/axios";
import { useToastStore } from "../store/useToastStore";
import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import { Navbar } from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Profile.css";
import UserStats from "../components/UserStats";
import SubmissionHeatmap from "../components/SubmissionHeatmap";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const { authUser, checkAuth } = useAuthStore();
  const { success: showSuccess, error: showError } = useToastStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    bio: "",
    githubProfile: "",
    linkedinProfile: ""
  });

  // Initialize profile data when authUser changes
  useEffect(() => {
    if (authUser) {
      setProfileData({
        name: authUser.name || "",
        gender: authUser.gender || "",
        dateOfBirth: authUser.dateOfBirth ? authUser.dateOfBirth.split('T')[0] : "",
        bio: authUser.bio || "",
        githubProfile: authUser.githubProfile || "",
        linkedinProfile: authUser.linkedinProfile || ""
      });
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      
      const updateData = { ...profileData };
      
      // Remove empty strings and replace with null
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === "") {
          updateData[key] = null;
        }
      });

      const response = await axiosInstance.put("/auth/profile", updateData);
      
      if (response.data.success) {
        showSuccess("Profile updated successfully!");
        setIsEditing(false);
        // Refresh auth user data
        await checkAuth();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage = error.response?.data?.message || "Failed to update profile";
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset to original data
    if (authUser) {
      setProfileData({
        name: authUser.name || "",
        gender: authUser.gender || "",
        dateOfBirth: authUser.dateOfBirth ? authUser.dateOfBirth.split('T')[0] : "",
        bio: authUser.bio || "",
        githubProfile: authUser.githubProfile || "",
        linkedinProfile: authUser.linkedinProfile || ""
      });
    }
    setIsEditing(false);
  };

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

  const slideVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
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
          
          {/* Edit/Save buttons */}
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.button
                  key="edit"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setIsEditing(true)}
                  className="profile-btn profile-btn-primary flex items-center gap-2 px-4 py-2"
                >
                  <Edit size={16} /> Edit Profile
                </motion.button>
              ) : (
                <motion.div 
                  key="save-cancel"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center gap-2"
                >
                  <button
                    onClick={handleCancelEdit}
                    className="profile-btn profile-btn-outline flex items-center gap-2 px-4 py-2"
                    disabled={isLoading}
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="profile-btn profile-btn-primary flex items-center gap-2 px-4 py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                      <Save size={16} />
                    )}
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="text-2xl font-bold bg-transparent border-b-2 border-blue-400 text-center focus:outline-none focus:border-blue-500 mb-2 neue-med"
                  placeholder="Enter your name"
                />
              ) : (
                <h2 className="text-2xl font-bold neue-med bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {authUser.name || "Anonymous User"}
                </h2>
              )}
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
              {isEditing ? (
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              ) : (
                <div className="neue-med text-sm text-slate-200">
                  {authUser.gender ? authUser.gender.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : "Not specified"}
                </div>
              )}
            </motion.div>

            {/* Date of Birth */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="neue-reg text-sm text-slate-400">Date of Birth</span>
              </div>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
                />
              ) : (
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
              )}
            </motion.div>

            {/* Bio */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-4 h-4 text-yellow-400" />
                <span className="neue-reg text-sm text-slate-400">Bio</span>
              </div>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-200 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="neue-med text-sm text-slate-200">
                  {authUser.bio || "No bio added yet"}
                </div>
              )}
            </motion.div>

            {/* GitHub Profile */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <Github className="w-4 h-4 text-gray-400" />
                <span className="neue-reg text-sm text-slate-400">GitHub Profile</span>
              </div>
              {isEditing ? (
                <input
                  type="url"
                  name="githubProfile"
                  value={profileData.githubProfile}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
                  placeholder="https://github.com/username"
                />
              ) : (
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
              )}
            </motion.div>

            {/* LinkedIn Profile */}
            <motion.div className="profile-stats p-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-2">
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span className="neue-reg text-sm text-slate-400">LinkedIn Profile</span>
              </div>
              {isEditing ? (
                <input
                  type="url"
                  name="linkedinProfile"
                  value={profileData.linkedinProfile}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
                  placeholder="https://linkedin.com/in/username"
                />
              ) : (
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
              )}
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
    </div>
  );
};

export default Profile;