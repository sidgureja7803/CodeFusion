import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Save, 
  Mail, 
  User, 
  Calendar,
  Github,
  Linkedin,
  FileText,
  UserCheck
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../libs/axios";
import { useToastStore } from "../store/useToastStore";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { authUser, checkAuth } = useAuthStore();
  const { success: showSuccess, error: showError } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    bio: "",
    githubProfile: "",
    linkedinProfile: ""
  });

  // Initialize profile data when modal opens or authUser changes
  useEffect(() => {
    if (authUser && isOpen) {
      setProfileData({
        name: authUser.name || "",
        gender: authUser.gender || "",
        dateOfBirth: authUser.dateOfBirth ? authUser.dateOfBirth.split('T')[0] : "",
        bio: authUser.bio || "",
        githubProfile: authUser.githubProfile || "",
        linkedinProfile: authUser.linkedinProfile || ""
      });
    }
  }, [authUser, isOpen]);

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

      console.log("Updating profile with data:", updateData);

      const response = await axiosInstance.put("/auth/profile", updateData);
      
      if (response.data.success) {
        showSuccess("Profile updated successfully!");
        // Refresh auth user data
        await checkAuth();
        onClose();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage = error.response?.data?.message || "Failed to update profile";
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset to original data when closing
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
    onClose();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={handleClose}
      >
        <motion.div
          className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700/50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold neue-med bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Edit Profile
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <User className="w-4 h-4" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Enter your name"
                disabled={isLoading}
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={authUser?.email || ""}
                className="w-full bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-400 cursor-not-allowed"
                disabled
                readOnly
              />
              <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <UserCheck className="w-4 h-4" />
                Gender
              </label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                disabled={isLoading}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <FileText className="w-4 h-4" />
                Bio
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows={4}
                maxLength={500}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                placeholder="Tell us about yourself..."
                disabled={isLoading}
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-slate-500">Max 500 characters</p>
                <p className="text-xs text-slate-500">{profileData.bio.length}/500</p>
              </div>
            </div>

            {/* GitHub Profile */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <Github className="w-4 h-4" />
                GitHub Profile
              </label>
              <input
                type="url"
                name="githubProfile"
                value={profileData.githubProfile}
                onChange={handleInputChange}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="https://github.com/username"
                disabled={isLoading}
              />
            </div>

            {/* LinkedIn Profile */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedinProfile"
                value={profileData.linkedinProfile}
                onChange={handleInputChange}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="https://linkedin.com/in/username"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">
            <button
              onClick={handleClose}
              className="px-6 py-2 text-slate-300 hover:text-white transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditProfileModal; 