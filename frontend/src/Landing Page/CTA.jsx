import React, { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useAnimation } from "framer-motion";
import "../styles/CTA.css";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 8,
      },
    },
    tap: { scale: 0.98 },
  };

  return (
    <div id="cta" className="min-h-[90vh] py-24 px-4 bg-[#0a101f]" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl relative min-h-[70vh] rounded-3xl overflow-hidden flex items-center justify-center">
        {/* Professional Background */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0.9 }}
          animate={controls}
          variants={{
            hidden: { scale: 1.05, opacity: 0.9 },
            visible: { scale: 1, opacity: 1 }
          }}
          transition={{ duration: 1.5 }}
          className="absolute w-full h-full bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] border border-blue-500/10 rounded-3xl"
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 rounded-3xl"></div>
        
        {/* Subtle glow effects */}
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#0070f3]/10 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-[#9333ea]/10 rounded-full blur-[80px] opacity-20"></div>

        {/* Modern Floating Code Snippets */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Code Snippet 1 - Top Left */}
          <motion.div 
            className="absolute top-20 left-10 md:left-20 bg-[#112240]/80 backdrop-blur-sm rounded-lg p-4 border border-[#0070f3]/30 shadow-2xl max-w-xs hidden md:block"
            variants={{
              hidden: { opacity: 0, y: 100, scale: 0.8, rotation: -5 },
              visible: { opacity: 1, y: 0, scale: 1, rotation: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2 font-mono">collaboration.js</span>
            </div>
            <div className="text-xs font-mono space-y-1.5 text-left">
              <div className="text-[#5ccfe6]">const team = new CodeFusion();</div>
              <div className="text-[#82aaff]">team.collaborate().realTime();</div>
              <div className="text-[#c3e88d]">// Seamless collaboration ✨</div>
            </div>
          </motion.div>

          {/* Code Snippet 2 - Top Right */}
          <motion.div 
            className="absolute top-32 right-16 md:right-28 bg-[#112240]/80 backdrop-blur-sm rounded-lg p-4 border border-[#9333ea]/30 shadow-2xl max-w-xs hidden md:block"
            variants={{
              hidden: { opacity: 0, y: 100, scale: 0.8, rotation: 5 },
              visible: { opacity: 1, y: 0, scale: 1, rotation: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2 font-mono">ai-assistant.py</span>
            </div>
            <div className="text-xs font-mono space-y-1.5 text-left">
              <div className="text-[#f78c6c]">def solve_problem():</div>
              <div className="text-[#c792ea]">    ai = GPT5Assistant()</div>
              <div className="text-[#89ddff]">    return ai.help_debug() 🧠</div>
            </div>
          </motion.div>

          {/* Code Snippet 3 - Bottom Left */}
          <motion.div 
            className="absolute bottom-32 left-20 bg-[#112240]/80 backdrop-blur-sm rounded-lg p-4 border border-[#3b82f6]/30 shadow-2xl max-w-xs hidden md:block"
            variants={{
              hidden: { opacity: 0, y: -60, scale: 0.8, rotation: -5 },
              visible: { opacity: 1, y: 0, scale: 1, rotation: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2 font-mono">execute.js</span>
            </div>
            <div className="text-xs font-mono space-y-1.5 text-left">
              <div className="text-[#ffcb6b]"># Run with confidence</div>
              <div className="text-[#82aaff]">await judge0.execute(code)</div>
              <div className="text-[#c3e88d]">console.log("✅ Executed!")</div>
            </div>
          </motion.div>

          {/* Code Snippet 4 - Bottom Right */}
          <motion.div 
            className="absolute bottom-20 right-32 bg-[#112240]/80 backdrop-blur-sm rounded-lg p-4 border border-[#0070f3]/30 shadow-2xl max-w-xs hidden md:block"
            variants={{
              hidden: { opacity: 0, y: -60, scale: 0.8, rotation: 5 },
              visible: { opacity: 1, y: 0, scale: 1, rotation: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2 font-mono">success.java</span>
            </div>
            <div className="text-xs font-mono space-y-1.5 text-left">
              <div className="text-[#c792ea]">public class Success {`{`}</div>
              <div className="text-[#82aaff]">  System.out.println("Success!");</div>
              <div className="text-[#c3e88d]">{"} // 🚀"}</div>
            </div>
          </motion.div>
        </div>

        {/* Professional Content Layer */}
        <div className="relative z-10 h-full w-full py-8">
          <motion.div
            className="text-center max-w-4xl mx-auto px-6 flex flex-col items-center justify-center h-full"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={itemVariants} className="mb-4 inline-block">
              <span className="bg-gradient-to-r from-[#0070f3]/10 to-[#9333ea]/10 backdrop-blur-sm border border-blue-500/10 px-4 py-1 rounded-md text-blue-200 text-sm font-medium">Experience the Future</span>
            </motion.div>
            
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Elevate Your Coding</span>{" "}
              <span className="text-3xl md:text-4xl lg:text-5xl block mt-2 bg-gradient-to-r from-[#0070f3] via-[#9333ea] to-[#0070f3] bg-clip-text text-transparent font-normal">with GPT-5 Powered Assistance</span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl"
              variants={itemVariants}
            >
              Where collaborative coding meets AI-powered innovation. Join thousands of developers building the future with CodeFusion.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-8" variants={itemVariants}>
              <Link to="/sign-up">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 bg-[#0070f3] text-white font-semibold rounded-lg text-lg flex items-center justify-center gap-2 min-w-[200px]"
                >
                  Get Started <ArrowRight size={18} />
                </motion.button>
              </Link>
              
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://youtu.be/Rczr7Lizdy0?feature=shared"
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-lg text-lg min-w-[200px]"
                >
                  Watch Demo
                </motion.button>
              </a>
            </motion.div>

            <motion.div className="flex flex-wrap gap-4 justify-center" variants={itemVariants}>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>24/7 support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
