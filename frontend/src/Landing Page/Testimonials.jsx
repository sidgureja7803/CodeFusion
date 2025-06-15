import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Using CSS gradient background instead of batman image
import "../styles/ThirdPage.css";

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced animated background gradient
      gsap.to(".testimonials-bg", {
        backgroundPosition: "200% 200%",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Staggered testimonial cards entrance
      gsap.fromTo(".testimonial-card", 
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotationX: 15
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Enhanced floating testimonial cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: -12,
            duration: 4 + (index * 0.5),
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.3
          });

          // Hover animation
          const tl = gsap.timeline({ paused: true });
          tl.to(card, {
            y: -20,
            scale: 1.05,
            rotationY: 3,
            boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
            duration: 0.4,
            ease: "power2.out"
          });

          card.addEventListener('mouseenter', () => tl.play());
          card.addEventListener('mouseleave', () => tl.reverse());
        }
      });

      // Floating quote animations
      gsap.to(".floating-quote", {
        y: -15,
        x: 8,
        rotation: 10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 1.5
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
      {/* Enhanced Animated Background */}
      <div className="testimonials-bg absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
           style={{
             backgroundSize: "400% 400%",
             backgroundImage: "linear-gradient(-45deg, #0f172a, #581c87, #312e81, #1e293b, #0f172a)"
           }}>
        
        {/* Enhanced floating elements */}
        <div className="floating-quote absolute top-24 left-12 w-32 h-32 bg-purple-500/15 rounded-full blur-xl"></div>
        <div className="floating-quote absolute top-48 right-16 w-24 h-24 bg-blue-500/15 rounded-full blur-lg"></div>
        <div className="floating-quote absolute bottom-32 left-24 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl"></div>
        <div className="floating-quote absolute bottom-48 right-32 w-28 h-28 bg-cyan-500/15 rounded-full blur-lg"></div>
        <div className="floating-quote absolute top-1/3 left-1/3 w-20 h-20 bg-violet-500/10 rounded-lg rotate-45 blur-md"></div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-20">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "power3.out" }}
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

        {/* Enhanced Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="testimonial-card group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 transform-gpu"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
              }}
            >
              {/* Enhanced quote icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <Quote className="w-10 h-10 text-purple-400" />
              </div>

              {/* Enhanced rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>

              {/* Enhanced testimonial text */}
              <p className="text-gray-300 leading-relaxed mb-8 text-lg group-hover:text-gray-200 transition-colors duration-300">
                "{testimonial.text}"
              </p>

              {/* Enhanced author info */}
              <div className="flex items-center">
                {/* Enhanced Avatar */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  {testimonial.avatar}
                </div>
                
                {/* Enhanced author details */}
                <div>
                  <h4 className="text-white font-bold text-lg group-hover:text-purple-200 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-base group-hover:text-gray-300 transition-colors duration-300">
                    {testimonial.role} at <span className="font-semibold">{testimonial.company}</span>
                  </p>
                </div>
              </div>

              {/* Enhanced hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-all duration-500 blur-xl`}></div>
              
              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     background: `linear-gradient(135deg, ${testimonial.gradient.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
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
          transition={{ duration: 0.8, delay: 0.8, ease: "power3.out" }}
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
