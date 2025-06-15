import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import bg from "../assets/images/arkham4.png";
import "../styles/ThirdPage.css";

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Software Engineer @ Google",
      text: "Arkham Labs transformed my approach to technical interviews. The realistic practice environment and curated challenges made all the difference.",
      company: "Google",
    },
    {
      name: "Priya Sharma",
      role: "Senior Developer @ Meta",
      text: "Training like the League of Shadows is no joke. Three months with Arkham Labs and I walked into my Meta interview with absolute confidence.",
      company: "Meta",
    },
    {
      name: "James Wilson",
      role: "Tech Lead @ Amazon",
      text: "The progress tracking helped me identify my weak spots immediately. Within weeks, I turned those weaknesses into strengths and aced my interviews.",
      company: "Amazon",
    },
    {
      name: "Mira Patel",
      role: "Backend Engineer @ Netflix",
      text: "The dark-themed practice sessions really do mimic the pressure of interviews. When the real thing came, it felt like just another night in Gotham.",
      company: "Netflix",
    },
    {
      name: "David Kim",
      role: "Software Developer @ Microsoft",
      text: "I tried multiple interview prep platforms, but Arkham Labs was the only one that felt like real training rather than endless tutorials.",
      company: "Microsoft",
    },
  ];

  // Duplicate testimonials for second row (we'll use a different subset)
  const moreTestimonials = [
    {
      name: "Sophia Rodriguez",
      role: "Full Stack Developer @ Stripe",
      text: "From imposter syndrome to tech lead in six months. Arkham Labs didn't just prepare me for interviews—it transformed my entire approach to problem-solving.",
      company: "Stripe",
    },
    {
      name: "Raj Patel",
      role: "Infrastructure Engineer @ Cloudflare",
      text: "The personalized challenge sequence pushed my limits in exactly the right ways. I'm solving problems now that I couldn't even understand before.",
      company: "Cloudflare",
    },
    {
      name: "Emma Johnson",
      role: "Algorithm Specialist @ Trading Firm",
      text: "For high-frequency trading interviews, you need precision and speed. Arkham Labs honed both until my solutions were practically muscle memory.",
      company: "Top Trading Firm",
    },
    {
      name: "Marcus Williams",
      role: "Security Engineer @ Apple",
      text: "The bat-signal went up, and Arkham Labs answered. I went from rejected by Apple twice to accepting an offer with a 40% higher salary than expected.",
      company: "Apple",
    },
    {
      name: "Leila Nguyen",
      role: "ML Engineer @ Anthropic",
      text: "Even for AI specialists, the fundamentals matter. Arkham Labs helped me shore up my core skills while letting me focus on my machine learning expertise.",
      company: "Anthropic",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  return (
    <div id="testimonials" className="min-h-[95vh] p-4" ref={sectionRef}>
      <div className="relative min-h-[95vh] rounded-4xl overflow-hidden">
        {/* Background Image with animation */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0.8 }
          }
          transition={{ duration: 1.5 }}
          src={bg}
          className="absolute w-full h-full object-cover bg"
          alt="Arkham background"
          loading="eager"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full w-full flex flex-col items-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="sm:text-5xl text-4xl text-center mt-8 neue-montreal text-white/90 tracking-tighter neue-med"
          >
            Testimonials{" "}
            {/* <span className="italic tracking-normal sm:text-5xl text-4xl">
              (you'll love)
            </span> */}
          </motion.h1>
          <motion.p
            initial={{ y: -15, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="sm:text-lg text-base text-center mt-2 neue-montreal text-transparent bg-gradient-to-r from-white to-[#949494] bg-clip-text neue-med"
          >
            Trained in Silence. Praised in Interviews.
          </motion.p>
        </div>

        {/* Testimonial cards with animation */}
        <motion.div
          className="mt-8 mb-4 w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="testimonial-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                className="testimonial-card"
                key={`row1-${index}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="quote-icon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  ❝
                </motion.div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-8 w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="testimonial-track-reverse">
            {[...moreTestimonials, ...moreTestimonials].map(
              (testimonial, index) => (
                <motion.div
                  className="testimonial-card"
                  key={`row2-${index}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <motion.div
                    className="quote-icon"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    ❝
                  </motion.div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
