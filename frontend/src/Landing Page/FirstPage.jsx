import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ParallaxStickers from "../components/ParallaxStickers";
import { Link } from "react-router-dom";

export const FirstPage = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Animation variants
  const badgeVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const trustTextVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 0.8,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.9,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <motion.div
      id="home"
      className="first-page min-h-screen w-full relative overflow-hidden pt-16"
      ref={sectionRef}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="flex flex-col justify-center items-center absolute z-[1] w-full">
        <div className="h-[90vh] w-[98vw] relative overflow-hidden rounded-4xl">
          <ParallaxStickers />
        </div>
        
        <div className="z-[2] absolute sm:top-0 top-24 left-0 w-full h-screen flex flex-col sm:justify-center items-center" ref={heroRef}>
          <div className="flex flex-col gap-3 items-center mb-6">
            <motion.div
              className="flex items-center justify-center gap-2 text-white px-4 py-2 rounded-full uppercase bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm"
              variants={badgeVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Real-time Collaboration</span>
            </motion.div>
            
            <motion.div
              className="flex items-center justify-center gap-2 text-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm"
              variants={badgeVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium">Powered by Blackbox AI</span>
            </motion.div>
          </div>

          <motion.p
            className="text-sm text-blue-200 mb-6 tracking-wide opacity-80"
            variants={trustTextVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Trusted by developers from top tech companies
          </motion.p>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <h1 className="text-xl sm:text-2xl font-bold text-center text-white mb-4">
              Welcome to
            </h1>
            <h1 className="sm:text-7xl text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              CODEFUSION
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-center text-gray-300 mt-4 max-w-2xl px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Where <span className="text-blue-400 font-semibold">collaborative coding</span> meets{" "}
            <span className="text-purple-400 font-semibold">AI-powered assistance</span>
          </motion.p>

          <motion.button
            className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileTap="tap"
            whileHover="hover"
          >
            <Link to="/sign-up" className="flex items-center gap-2">
              <span>✨</span> Start Coding Together
            </Link>
          </motion.button>

          <motion.p
            className="text-sm text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            No credit card required • Free to start
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
