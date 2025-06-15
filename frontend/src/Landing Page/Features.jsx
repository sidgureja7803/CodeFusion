import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Users, Zap, Brain, GitBranch, Sparkles } from "lucide-react";
import gsap from "gsap";

export const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background gradient
      gsap.to(".features-bg", {
        backgroundPosition: "200% 200%",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // Card hover animations
      gsap.set(".feature-card", { 
        transformOrigin: "center center",
        scale: 1 
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const iconVariants = {
    hidden: { scale: 0.6, opacity: 0, rotate: -20 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

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
      icon: <Code2 className="w-8 h-8" />,
      title: "Real-Time Code Collaboration",
      description: "Code together in real-time with your team. See changes instantly, share cursors, and collaborate seamlessly on any project.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Assistant",
      description: "Get intelligent code suggestions, debugging help, and explanations powered by advanced AI. Your coding companion that never sleeps.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Workspaces",
      description: "Create dedicated spaces for your team projects. Organize code, share resources, and track progress all in one place.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Performance",
      description: "Experience blazing-fast code execution and compilation. Optimized infrastructure ensures your code runs at maximum speed.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Version Control Integration",
      description: "Seamlessly integrate with Git and other version control systems. Track changes, manage branches, and collaborate with confidence.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Smart Code Analysis",
      description: "Advanced code analysis and suggestions help you write better, more efficient code. Learn best practices as you code.",
      gradient: "from-rose-500 to-red-500"
    }
  ];

  return (
    <div
      id="features"
      className="min-h-[95vh] p-4 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Animated Background */}
      <div className="features-bg absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
           style={{
             backgroundSize: "400% 400%",
             backgroundImage: "linear-gradient(-45deg, #0f172a, #1e3a8a, #312e81, #1e293b, #0f172a)"
           }}>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-16">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="sm:text-5xl text-4xl text-center mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent font-bold"
        >
          Powerful Features{" "}
          <span className="italic text-blue-400">for Modern Development</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: -15, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="sm:text-lg text-base text-center mt-4 text-gray-300 max-w-3xl px-4 mb-12"
        >
          Everything you need to code collaboratively, learn faster, and build amazing projects together.
        </motion.p>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl px-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="feature-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              {/* Card glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <motion.div
                variants={iconVariants}
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:shadow-lg transition-shadow duration-300`}
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300 mb-6">Ready to experience the future of collaborative coding?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
