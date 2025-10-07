import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "Google",
      text: "CodeFusion transformed how our team collaborates on code. The real-time editing and AI assistance made our development process 3x faster.",
      rating: 5,
      avatar: "SC",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead",
      company: "Meta",
      text: "The AI-powered code suggestions are incredibly accurate. It's like having a senior developer pair programming with you 24/7.",
      rating: 5,
      avatar: "MR",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Emily Johnson",
      role: "Full Stack Developer",
      company: "Microsoft",
      text: "Finally, a platform that makes remote pair programming feel natural. The collaborative features are seamless and intuitive.",
      rating: 5,
      avatar: "EJ",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "David Kim",
      role: "Software Engineer",
      company: "Amazon",
      text: "CodeFusion's workspace organization is brilliant. Managing multiple projects with my team has never been this smooth.",
      rating: 5,
      avatar: "DK",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Lisa Wang",
      role: "Frontend Developer",
      company: "Netflix",
      text: "The real-time collaboration features are game-changing. We can debug together, share ideas instantly, and ship faster than ever.",
      rating: 5,
      avatar: "LW",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      name: "Alex Thompson",
      role: "DevOps Engineer",
      company: "Stripe",
      text: "Integration with our existing tools was seamless. CodeFusion fits perfectly into our development workflow.",
      rating: 5,
      avatar: "AT",
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <div id="testimonials" className="min-h-screen p-4 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#1e3a5f] to-[#0a192f]">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-20">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-blue-200">Trusted by Industry Leaders</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
            Loved by Developers{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block mt-2">Worldwide</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            See what developers from top tech companies are saying about CodeFusion.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl px-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
              style={{
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" }}
            >
              {/* Hover gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
              
              {/* Content wrapper */}
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-all duration-500">
                  <Quote className="w-12 h-12 text-blue-400" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 leading-relaxed mb-8 text-base group-hover:text-white transition-colors duration-300">
                  "{testimonial.text}"
                </p>

                {/* Author info */}
                <div className="flex items-center pt-6 border-t border-white/10 group-hover:border-blue-500/20 transition-colors duration-500">
                  {/* Avatar */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-base mr-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-500`}>
                    {testimonial.avatar}
                  </div>
                  
                  {/* Author details */}
                  <div>
                    <h4 className="text-white font-bold text-base group-hover:text-blue-200 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                      {testimonial.role} at <span className="font-semibold text-blue-400">{testimonial.company}</span>
                    </p>
                  </div>
                </div>
              </div>
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
          <p className="text-lg text-gray-300 mb-6">
            Join thousands of developers who trust CodeFusion
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Star className="w-5 h-5" />
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
