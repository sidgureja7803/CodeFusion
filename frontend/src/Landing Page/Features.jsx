import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Users, Zap, Brain, GitBranch, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Features = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced animated background gradient
      gsap.to(".features-bg", {
        backgroundPosition: "200% 200%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Staggered card entrance animation
      gsap.fromTo(".feature-card", 
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: 15
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced card hover animations
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const tl = gsap.timeline({ paused: true });
          
          tl.to(card, {
            y: -15,
            scale: 1.05,
            rotationY: 5,
            boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
            duration: 0.4,
            ease: "power2.out"
          });

          card.addEventListener('mouseenter', () => tl.play());
          card.addEventListener('mouseleave', () => tl.reverse());
        }
      });

      // Floating elements animation
      gsap.to(".floating-shape", {
        y: -20,
        x: 10,
        rotation: 360,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 2
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
      gradient: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Assistant",
      description: "Get intelligent code suggestions, debugging help, and explanations powered by advanced AI. Your coding companion that never sleeps.",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Workspaces",
      description: "Create dedicated spaces for your team projects. Organize code, share resources, and track progress all in one place.",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Performance",
      description: "Experience blazing-fast code execution and compilation. Optimized infrastructure ensures your code runs at maximum speed.",
      gradient: "from-yellow-500 to-orange-500",
      delay: 0.3
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Version Control Integration",
      description: "Seamlessly integrate with Git and other version control systems. Track changes, manage branches, and collaborate with confidence.",
      gradient: "from-indigo-500 to-blue-500",
      delay: 0.4
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Smart Code Analysis",
      description: "Advanced code analysis and suggestions help you write better, more efficient code. Learn best practices as you code.",
      gradient: "from-rose-500 to-red-500",
      delay: 0.5
    }
  ];

  return (
    <div
      id="features"
      className="min-h-screen p-4 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Enhanced Animated Background */}
      <div className="features-bg absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
           style={{
             backgroundSize: "400% 400%",
             backgroundImage: "linear-gradient(-45deg, #0f172a, #1e3a8a, #312e81, #1e293b, #0f172a)"
           }}>
        
        {/* Enhanced geometric shapes */}
        <div className="floating-shape absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="floating-shape absolute bottom-40 right-20 w-48 h-48 bg-purple-500/15 rounded-full blur-xl"></div>
        <div className="floating-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="floating-shape absolute top-32 right-32 w-24 h-24 bg-pink-500/15 rounded-lg rotate-45 blur-lg"></div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-20">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "power3.out" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
            Powerful Features{" "}
            <span className="italic text-blue-400 block mt-2">for Modern Development</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Everything you need to code collaboratively, learn faster, and build amazing projects together.
          </p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="feature-card group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 transform-gpu"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
              }}
            >
              {/* Enhanced card glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-all duration-500 blur-xl`}></div>
              
              {/* Enhanced Icon */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Enhanced Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Enhanced hover indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
              </div>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     background: `linear-gradient(135deg, ${feature.gradient.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
                     padding: '2px',
                     WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                     WebkitMaskComposite: 'exclude'
                   }}>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "power3.out" }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-300 mb-8">
            Ready to transform your development workflow?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
