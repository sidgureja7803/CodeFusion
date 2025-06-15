import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import gsap from "gsap";
import bg from "../assets/images/arkham4.png";
import "../styles/ThirdPage.css";

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background gradient
      gsap.to(".testimonials-bg", {
        backgroundPosition: "200% 200%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // Floating testimonial cards animation
      gsap.to(".testimonial-card", {
        y: -8,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 1.2
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "Google",
      text: "CodeFusion transformed how our team collaborates on code. The real-time editing and AI assistance made our development process 3x faster.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead",
      company: "Meta",
      text: "The AI-powered code suggestions are incredibly accurate. It's like having a senior developer pair programming with you 24/7.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Full Stack Developer",
      company: "Microsoft",
      text: "Finally, a platform that makes remote pair programming feel natural. The collaborative features are seamless and intuitive.",
      rating: 5,
      avatar: "EJ"
    },
    {
      name: "David Kim",
      role: "Software Engineer",
      company: "Amazon",
      text: "CodeFusion's workspace organization is brilliant. Managing multiple projects with my team has never been this smooth.",
      rating: 5,
      avatar: "DK"
    },
    {
      name: "Lisa Wang",
      role: "Frontend Developer",
      company: "Netflix",
      text: "The real-time collaboration features are game-changing. We can debug together, share ideas instantly, and ship faster than ever.",
      rating: 5,
      avatar: "LW"
    },
    {
      name: "Alex Thompson",
      role: "DevOps Engineer",
      company: "Stripe",
      text: "Integration with our existing tools was seamless. CodeFusion fits perfectly into our development workflow.",
      rating: 5,
      avatar: "AT"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div id="testimonials" className="min-h-[95vh] p-4 relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background */}
      <div className="testimonials-bg absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
           style={{
             backgroundSize: "400% 400%",
             backgroundImage: "linear-gradient(-45deg, #0f172a, #581c87, #312e81, #1e293b, #0f172a)"
           }}>
        
        {/* Floating elements */}
        <div className="absolute top-24 left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-48 right-16 w-24 h-24 bg-blue-500/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-24 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-48 right-32 w-28 h-28 bg-cyan-500/10 rounded-full blur-lg"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-16">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="sm:text-5xl text-4xl text-center mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-bold"
        >
          Loved by Developers{" "}
          <span className="italic text-purple-400">Worldwide</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: -15, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="sm:text-lg text-base text-center mt-4 text-gray-300 max-w-2xl px-4 mb-12"
        >
          See what developers from top tech companies are saying about CodeFusion.
        </motion.p>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl px-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="testimonial-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <Quote className="w-8 h-8 text-purple-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                "{testimonial.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                
                {/* Author details */}
                <div>
                  <h4 className="text-white font-semibold group-hover:text-purple-200 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl px-4"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-gray-400">Active Developers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400">Companies Trust Us</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-gray-400">Uptime Guarantee</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Join the Community
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
