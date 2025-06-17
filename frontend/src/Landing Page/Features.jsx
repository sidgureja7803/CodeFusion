import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Users, Zap, Brain, GitBranch, Sparkles, Play, Clock, Shield, Database } from "lucide-react";

export const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: <Play className="w-8 h-8" />,
      title: "Judge0 Code Execution",
      description: "Execute your code instantly with the robust Judge0 API. Support for multiple programming languages with real-time compilation and execution.",
      gradient: "from-emerald-500 to-teal-500",
      delay: 0,
      tech: "Judge0 API"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Llama3-70B AI Assistant",
      description: "Get intelligent help from Llama3-70b-8192 model via Novita.ai. Problem understanding, solution approaches, debugging, and code explanations.",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1,
      tech: "Novita.ai + Llama3"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-Time Collaboration",
      description: "Code together live with Liveblocks integration. See each other's cursors, share sessions, and collaborate seamlessly in real-time.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.2,
      tech: "Liveblocks API"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "LeetCode-Style Platform",
      description: "Solve coding problems just like LeetCode. Complete problem sets, track your progress, and build your coding skills systematically.",
      gradient: "from-orange-500 to-red-500",
      delay: 0.3,
      tech: "PostgreSQL + Prisma"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Submission History & Analytics",
      description: "Visualize your coding journey with detailed submission history. Track your progress over time, just like GitHub contributions.",
      gradient: "from-indigo-500 to-blue-500",
      delay: 0.4,
      tech: "Analytics Dashboard"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Modern Animated UI",
      description: "Experience a world-class interface with smooth animations using GSAP and Framer Motion. Professional design meets delightful interactions.",
      gradient: "from-yellow-500 to-orange-500",
      delay: 0.5,
      tech: "GSAP + Framer Motion"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Firebase Authentication",
      description: "Secure login with Firebase. Support for Google and GitHub OAuth, ensuring your coding sessions are safe and personalized.",
      gradient: "from-red-500 to-pink-500",
      delay: 0.6,
      tech: "Firebase Auth"
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Problem Playlists",
      description: "Organize your coding practice with custom playlists. Create themed collections, save problems for revision, and structure your learning.",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.7,
      tech: "Custom Organization"
    }
  ];

  return (
    <div
      id="features"
      className="min-h-screen p-4 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60 animate-pulse"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-ping"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-20">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent">
            Powerful Features{" "}
            <span className="italic text-purple-400 block mt-2">Built for Coders</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Everything you need for competitive programming, learning, and collaborative coding in one platform.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-purple-300">
            <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">Judge0 API</span>
            <span className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">Liveblocks</span>
            <span className="px-3 py-1 bg-pink-500/20 rounded-full border border-pink-500/30">Llama3-70B</span>
            <span className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">Firebase</span>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:border-white/30 transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
              }}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              custom={index}
            >
              {/* Tech badge */}
              <div className="absolute top-4 right-4 text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full border border-purple-500/30">
                {feature.tech}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-300 mb-8">
            Ready to level up your coding game?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Start Coding Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
