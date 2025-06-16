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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
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
            Loved by Developers{" "}
            <span className="italic text-purple-400 block mt-2">Worldwide</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See what developers from top tech companies are saying about CodeFusion.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl px-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-all duration-500">
                <Quote className="w-10 h-10 text-purple-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 leading-relaxed mb-8 text-lg group-hover:text-gray-200 transition-colors duration-300">
                "{testimonial.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center">
                {/* Avatar */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                  {testimonial.avatar}
                </div>
                
                {/* Author details */}
                <div>
                  <h4 className="text-white font-bold text-lg group-hover:text-purple-200 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-base group-hover:text-gray-300 transition-colors duration-300">
                    {testimonial.role} at <span className="font-semibold">{testimonial.company}</span>
                  </p>
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
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who trust CodeFusion
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
