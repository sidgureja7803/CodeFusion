import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../styles/CTA.css";
import { Link } from "react-router-dom";

export const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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
    <div id="cta" className="min-h-[90vh] p-4" ref={sectionRef}>
      <div className="relative min-h-[90vh] rounded-4xl overflow-hidden flex items-center justify-center">
        {/* Background with animation */}
        <motion.div
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0.8 }
          }
          transition={{ duration: 2 }}
          className="absolute w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          style={{
            backgroundImage: "linear-gradient(-45deg, #0f172a, #1e1b4b, #312e81, #1e293b, #0f172a)",
          }}
        />

        {/* Floating Code Snippets */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Code Snippet 1 - Top Left */}
          <motion.div 
            className="absolute top-20 left-10 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30 shadow-2xl max-w-xs"
            initial={{ opacity: 0, y: 100, scale: 0.8, rotation: -10 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1, rotation: 0 } : { opacity: 0, y: 100, scale: 0.8, rotation: -10 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2">collaboration.js</span>
            </div>
            <div className="text-xs font-mono space-y-1">
              <div className="text-purple-400">const team = new CodeFusion();</div>
              <div className="text-blue-300">team.collaborate().realTime();</div>
              <div className="text-green-400">// Magic happens here ✨</div>
            </div>
          </motion.div>

          {/* Code Snippet 2 - Top Right */}
          <motion.div 
            className="absolute top-32 right-16 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 shadow-2xl max-w-xs"
            initial={{ opacity: 0, y: 100, scale: 0.8, rotation: 10 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1, rotation: 0 } : { opacity: 0, y: 100, scale: 0.8, rotation: 10 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2">ai-assistant.py</span>
            </div>
            <div className="text-xs font-mono space-y-1">
              <div className="text-orange-400">def solve_problem():</div>
              <div className="text-cyan-300">    ai = LlamaAssistant()</div>
              <div className="text-pink-400">    return ai.help_debug() 🤖</div>
            </div>
          </motion.div>

          {/* Code Snippet 3 - Bottom Left */}
          <motion.div 
            className="absolute bottom-32 left-20 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30 shadow-2xl max-w-xs"
            initial={{ opacity: 0, y: -100, scale: 0.8, rotation: -5 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1, rotation: 0 } : { opacity: 0, y: -100, scale: 0.8, rotation: -5 }}
            transition={{ duration: 1.2, delay: 1.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2">deploy.sh</span>
            </div>
            <div className="text-xs font-mono space-y-1">
              <div className="text-yellow-400"># Deploy with confidence</div>
              <div className="text-green-300">git push origin main</div>
              <div className="text-blue-400">echo "🚀 Deployed!"</div>
            </div>
          </motion.div>

          {/* Code Snippet 4 - Bottom Right */}
          <motion.div 
            className="absolute bottom-20 right-32 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-pink-500/30 shadow-2xl max-w-xs"
            initial={{ opacity: 0, y: -100, scale: 0.8, rotation: 5 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1, rotation: 0 } : { opacity: 0, y: -100, scale: 0.8, rotation: 5 }}
            transition={{ duration: 1.2, delay: 1.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2">success.java</span>
            </div>
            <div className="text-xs font-mono space-y-1">
              <div className="text-purple-400">public class Success {`{`}</div>
              <div className="text-blue-300">  System.out.println("We did it!");</div>
              <div className="text-green-400">{"}"} // 🎉</div>
            </div>
          </motion.div>
        </div>

        {/* Content Layer */}
        <div className="relative cta-box z-10 h-full w-full ">
          <motion.div
            className="text-center max-w-4xl mx-auto px-4 flex flex-col items-center justify-center h-full"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="sm:text-6xl text-4xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Ready to <span className="italic">Embrace</span> the Night?
            </motion.h2>

            <motion.p
              className="sm:text-xl text-lg text-[#ffffff]/70 mb-8"
              variants={itemVariants}
            >
              Where collaborative coding meets AI-powered innovation.{" "}
              <br />
              Join the future of development with CodeFusion.
            </motion.p>

            <motion.div className="cta-buttons" variants={itemVariants}>
              <motion.button
                className="cta-button primary-button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="sign-up"> ✦&nbsp; Start Training</Link>
              </motion.button>

              <motion.button
                className="cta-button secondary-button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://youtu.be/Rczr7Lizdy0?feature=shared"
                >
                  Watch Demo
                </a>
              </motion.button>
            </motion.div>

            <motion.p
              className="text-sm text-[#f1f1f1]/60 "
              variants={itemVariants}
            >
              No credit card required. Cancel anytime.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
