import React, { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import ParallaxStickers from "../components/ParallaxStickers";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Users, GitMerge, Star, Zap, Shield, Code2, Check } from "lucide-react";

export const FirstPage = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants with enhanced effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0], // Custom easing function
      }
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.1 }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.7 }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(8, 112, 184, 0.35)",
      transition: { duration: 0.2, type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.97 }
  };
  
  const floatingBadgeVariants = {
    hidden: { opacity: 0, y: 20, x: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.8 + (i * 0.2),
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <motion.div
      id="home"
      className="first-page min-h-screen w-full relative overflow-hidden bg-[#0a101f]"
      ref={sectionRef}
    >
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f]">
        {/* Refined Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
        
        {/* Modern Glow Effects */}
        <div className="absolute top-40 left-[20%] w-[300px] h-[300px] bg-[#0070f3]/20 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-40 right-[30%] w-[250px] h-[250px] bg-[#9333ea]/20 rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-24 md:pt-28 lg:pt-32 h-screen flex flex-col items-center justify-center">
        {/* Floating Badges */}
        <motion.div 
          className="absolute top-24 right-10 md:right-28 hidden md:block"
          custom={0}
          variants={floatingBadgeVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="px-3 py-1.5 bg-gradient-to-r from-[#0070f3]/20 to-[#0070f3]/5 backdrop-blur-md rounded-lg border border-[#0070f3]/30 shadow-lg shadow-blue-500/5 flex items-center gap-2">
            <Shield size={14} className="text-[#0070f3]" />
            <span className="text-xs font-medium text-blue-100">Enterprise Grade</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute top-36 left-16 md:left-32 hidden md:block"
          custom={1}
          variants={floatingBadgeVariants}
          initial="hidden"
          animate={controls}
        >
          {/* <div className="px-3 py-1.5 bg-gradient-to-r from-[#10b981]/20 to-[#10b981]/5 backdrop-blur-md rounded-lg border border-[#10b981]/30 shadow-lg shadow-green-500/5 flex items-center gap-2">
            <Zap size={14} className="text-[#10b981]" />
            <span className="text-xs font-medium text-green-100">High Performance</span>
          </div> */}
        </motion.div>
        
        {/* Top Badges - Industry Standard Badges */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-3 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={itemVariants}
            className="px-4 py-2 bg-gradient-to-r from-[#0070f3]/10 to-[#0070f3]/20 backdrop-blur-sm border border-[#0070f3]/20 rounded-full flex items-center gap-2 shadow-lg shadow-blue-500/5"
          >
            <div className="w-2 h-2 bg-[#0070f3] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-100">Real-time Collaboration</span>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="px-4 py-2 bg-gradient-to-r from-[#9333ea]/10 to-[#9333ea]/20 backdrop-blur-sm border border-[#9333ea]/20 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/5"
          >
            <div className="w-2 h-2 bg-[#9333ea] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-100">Powered by GPT-5</span>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="px-4 py-2 bg-gradient-to-r from-[#10b981]/10 to-[#10b981]/20 backdrop-blur-sm border border-[#10b981]/20 rounded-full flex items-center gap-2 shadow-lg shadow-green-500/5"
          >
            <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-100">40+ Languages Support</span>
          </motion.div>
        </motion.div>

        {/* Hero Content with Professional Layout */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Content - Text and CTA */}
          <div className="flex-1 text-left lg:pr-6">
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="bg-gradient-to-r from-[#0070f3]/20 to-[#9333ea]/20 backdrop-blur-sm border border-blue-500/10 px-4 py-1 rounded-md text-blue-200 text-sm font-medium shadow-lg shadow-blue-500/5">Revolutionizing Collaborative Development</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Code Smarter, Build Faster</span> <br/>
              <span className="bg-gradient-to-r from-[#0070f3] via-[#9333ea] to-[#0070f3] bg-clip-text text-transparent">With AI-Powered Collaboration</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              CodeFusion merges real-time collaboration with GPT-5's intelligence to transform your development workflow. Execute code in 40+ languages, solve complex problems together, and accelerate your team's productivity with state-of-the-art AI assistance.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
              <Link to="/sign-up">
                <motion.button
                  className="px-8 py-3.5 bg-[#0070f3] text-white rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Start Coding <ArrowRight size={18} />
                </motion.button>
              </Link>
              
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="flex items-center gap-1.5">
                <Star size={15} className="text-yellow-400" fill="#facc15" />
                <Star size={15} className="text-yellow-400" fill="#facc15" />
                <Star size={15} className="text-yellow-400" fill="#facc15" />
                <Star size={15} className="text-yellow-400" fill="#facc15" />
                <Star size={15} className="text-yellow-400" fill="#facc15" />
              </span>
              <span>Trusted by 10,000+ developers from Fortune 500 companies</span>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mt-4">
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                SOC 2 Compliant
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                99.9% Uptime
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                GPT-5 Powered
              </div>
            </motion.div>
          </div>
          
          {/* Right Content - Advanced ParallaxStickers */}
          <motion.div 
            className="flex-1 relative min-h-[400px] w-full rounded-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f]/10 to-[#112240]/10 backdrop-blur-sm rounded-xl border border-blue-500/10"></div>
            <ParallaxStickers />
          </motion.div>
        </motion.div>
        
        {/* Enhanced Feature Highlights with Custom Indicators */}
        <motion.div 
          className="w-full max-w-5xl mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            className="group bg-gradient-to-br from-[#112240]/80 to-[#0a192f]/80 backdrop-blur-sm p-6 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 shadow-lg shadow-blue-500/5"
            variants={featureVariants}
            custom={0}
            whileHover="hover"
          >
            <div className="absolute top-0 right-0 h-1 w-1/4 bg-gradient-to-r from-[#0070f3] to-transparent rounded-tr-xl"></div>
            <div className="p-3 bg-[#0070f3]/10 rounded-lg w-max mb-4 group-hover:bg-[#0070f3]/20 transition-all duration-300">
              <Code2 size={20} className="text-[#0070f3]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Execute Code</h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Run code instantly with Judge0 in 40+ programming languages with real-time compilation and output.</p>
          </motion.div>
          
          <motion.div 
            className="group bg-gradient-to-br from-[#112240]/80 to-[#0a192f]/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 shadow-lg shadow-purple-500/5"
            variants={featureVariants}
            custom={1}
            whileHover="hover"
          >
            <div className="absolute top-0 right-0 h-1 w-1/4 bg-gradient-to-r from-[#9333ea] to-transparent rounded-tr-xl"></div>
            <div className="p-3 bg-[#9333ea]/10 rounded-lg w-max mb-4 group-hover:bg-[#9333ea]/20 transition-all duration-300">
              <Users size={20} className="text-[#9333ea]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">Collaborate</h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">See each other's cursors, share sessions, and collaborate with your team seamlessly in real-time.</p>
          </motion.div>
          
          <motion.div 
            className="group bg-gradient-to-br from-[#112240]/80 to-[#0a192f]/80 backdrop-blur-sm p-6 rounded-xl border border-green-500/10 hover:border-green-500/30 transition-all duration-300 shadow-lg shadow-green-500/5"
            variants={featureVariants}
            custom={2}
            whileHover="hover"
          >
            <div className="absolute top-0 right-0 h-1 w-1/4 bg-gradient-to-r from-[#10b981] to-transparent rounded-tr-xl"></div>
            <div className="p-3 bg-[#10b981]/10 rounded-lg w-max mb-4 group-hover:bg-[#10b981]/20 transition-all duration-300">
              <GitMerge size={20} className="text-[#10b981]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">AI Assistance</h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Get intelligent help from GPT-5 for problem solving, code optimization, and expert debugging assistance.</p>
          </motion.div>
          
          <motion.div 
            className="group bg-gradient-to-br from-[#112240]/80 to-[#0a192f]/80 backdrop-blur-sm p-6 rounded-xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 shadow-lg shadow-amber-500/5"
            variants={featureVariants}
            custom={3}
            whileHover="hover"
          >
            <div className="absolute top-0 right-0 h-1 w-1/4 bg-gradient-to-r from-[#f59e0b] to-transparent rounded-tr-xl"></div>
            <div className="p-3 bg-[#f59e0b]/10 rounded-lg w-max mb-4 group-hover:bg-[#f59e0b]/20 transition-all duration-300">
              <Star size={20} className="text-[#f59e0b]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">Track Progress</h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Visualize your coding journey with AI-powered analytics, skill tracking, and personalized improvement insights.</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-4 mt-12"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Check size={10} className="text-white" strokeWidth={3} />
            </div>
            <p className="text-sm text-gray-400">No credit card required</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Check size={10} className="text-white" strokeWidth={3} />
            </div>
            <p className="text-sm text-gray-400">Free to start</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Check size={10} className="text-white" strokeWidth={3} />
            </div>
            <p className="text-sm text-gray-400">Cancel anytime</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Check size={10} className="text-white" strokeWidth={3} />
            </div>
            <p className="text-sm text-gray-400">24/7 support</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
