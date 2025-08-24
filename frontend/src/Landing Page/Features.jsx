import React, { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useAnimation } from "framer-motion";
import { Code2, Users, Zap, Brain, GitBranch, Sparkles, Play, Clock, Shield, Database, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Features = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0], // Custom easing function
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }),
    hover: {
      y: -8,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Code Execution Engine",
      description: "Professional-grade execution environment powered by Judge0, supporting 40+ programming languages with real-time compilation and testing.",
      gradient: "from-[#0070f3] to-[#3b82f6]",
      tech: "Judge0 API",
      benefits: [
        "Support for 40+ programming languages",
        "Memory-safe execution environment",
        "Comprehensive test case framework"
      ]
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "GPT-5 AI Assistance",
      description: "Get intelligent help from OpenAI's most advanced model. Tackle complex problems with AI-powered suggestions, debugging assistance, and explanations.",
      gradient: "from-[#9333ea] to-[#a855f7]",
      tech: "OpenAI GPT-5",
      benefits: [
        "Context-aware code suggestions",
        "Intelligent debugging assistance",
        "Step-by-step problem explanations"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Enterprise Collaboration",
      description: "Industry-leading collaborative coding experience with Liveblocks. See teammates' cursors, share sessions, and work together in real-time.",
      gradient: "from-[#3b82f6] to-[#06b6d4]",
      tech: "Liveblocks API",
      benefits: [
        "Real-time cursor and selection sync",
        "Conflict-free editing experience",
        "Seamless session sharing"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Professional Problem Bank",
      description: "Access a growing library of coding challenges ranging from beginner to expert levels, carefully crafted to build your skills systematically.",
      gradient: "from-[#f59e0b] to-[#f97316]",
      tech: "PostgreSQL + Prisma",
      benefits: [
        "Curated industry-relevant problems",
        "Comprehensive test coverage",
        "Detailed solution explanations"
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Advanced Analytics Dashboard",
      description: "Track your coding journey with comprehensive analytics. Visualize progress, identify improvement areas, and build consistent coding habits.",
      gradient: "from-[#4f46e5] to-[#6366f1]",
      tech: "Analytics Dashboard",
      benefits: [
        "Visual performance tracking",
        "Skill gap analysis",
        "Personalized improvement recommendations"
      ]
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Enterprise-Grade UI",
      description: "Experience a world-class interface designed for professional developers, with smooth animations, intuitive workflows, and exceptional attention to detail.",
      gradient: "from-[#10b981] to-[#34d399]",
      tech: "GSAP + Framer Motion",
      benefits: [
        "Optimized for productivity",
        "Responsive on all devices",
        "Accessibility-first design"
      ]
    }
  ];

  return (
    <div
      id="features"
      className="min-h-screen relative overflow-hidden bg-[#0a101f] py-24"
      ref={sectionRef}
    >
      {/* Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        {/* Subtle glow effects */}
        <div className="absolute top-1/4 right-[25%] w-[350px] h-[350px] bg-[#0070f3]/10 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-1/4 left-[20%] w-[300px] h-[300px] bg-[#9333ea]/10 rounded-full blur-[100px] opacity-20"></div>
      </div>

      {/* Content Layer */}
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-20"
        >
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <motion.div variants={titleVariants} className="mb-4 inline-block">
              <span className="bg-gradient-to-r from-[#0070f3]/10 to-[#9333ea]/10 backdrop-blur-sm border border-blue-500/10 px-4 py-1 rounded-md text-blue-200 text-sm font-medium">Industry-Leading Tools</span>
            </motion.div>
            
            <motion.h1 variants={titleVariants} className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Powerful Features</span>{" "}
              <span className="text-3xl md:text-4xl block mt-1 bg-gradient-to-r from-[#0070f3] via-[#9333ea] to-[#0070f3] bg-clip-text text-transparent font-normal">Built for Professional Developers</span>
            </motion.h1>
            
            <motion.p variants={titleVariants} className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need for competitive programming, learning, and collaborative coding in one seamless platform.
            </motion.p>
          </div>
          
          <motion.div variants={titleVariants} className="flex flex-wrap justify-center gap-3 mt-10 mb-4">
            <span className="px-4 py-1.5 bg-[#0070f3]/10 rounded-full border border-[#0070f3]/20 text-sm text-blue-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#0070f3] rounded-full"></span>
              Judge0 API
            </span>
            <span className="px-4 py-1.5 bg-[#9333ea]/10 rounded-full border border-[#9333ea]/20 text-sm text-purple-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#9333ea] rounded-full"></span>
              OpenAI GPT-5
            </span>
            <span className="px-4 py-1.5 bg-[#3b82f6]/10 rounded-full border border-[#3b82f6]/20 text-sm text-blue-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full"></span>
              Liveblocks
            </span>
            <span className="px-4 py-1.5 bg-[#10b981]/10 rounded-full border border-[#10b981]/20 text-sm text-green-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
              Firebase
            </span>
          </motion.div>
        </motion.div>

        {/* Modern Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-gradient-to-br from-[#112240]/80 to-[#0a192f]/80 backdrop-blur-lg border border-blue-500/10 rounded-xl p-8 hover:border-blue-500/30 transition-all duration-300"
              variants={cardVariants}
              custom={index}
              whileHover="hover"
            >
              {/* Modern Tech badge */}
              <div className="absolute top-6 right-6 text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300">
                {feature.tech}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Feature benefit list */}
              <ul className="space-y-2 mb-6">
                {feature.benefits && feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Professional Bottom CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-24 text-center bg-gradient-to-r from-[#112240]/60 to-[#0a192f]/60 p-10 md:p-16 rounded-2xl border border-blue-500/10 backdrop-blur-md"
        >
          <motion.h2 variants={titleVariants} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to level up your coding experience?
          </motion.h2>
          
          <motion.p variants={titleVariants} className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join CodeFusion today and experience the perfect blend of collaborative coding and GPT-5 powered assistance.
          </motion.p>
          
          <motion.div variants={titleVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 112, 243, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-[#0070f3] text-white font-semibold rounded-lg text-lg flex items-center justify-center gap-2 min-w-[200px]"
              >
                Get Started <ArrowRight size={18} />
              </motion.button>
            </Link>
            
            <Link to="/features">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-lg text-lg min-w-[200px]"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
