import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import bg from "../assets/images/arkham6.png";
import "../styles/FAQs.css";

export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What languages do you support?",
      answer: "We support Javascript, Python and Java.",
    },
    {
      question: "Do I need prior coding experience?",
      answer:
        "Not at all. We guide you through the journey with increasing difficulty. Start with our beginner-friendly problems and work your way up as you build confidence.",
    },
    {
      question: "How long until I see improvement in my coding interviews?",
      answer:
        "Most users report significant confidence improvements within 2-3 weeks of consistent training. Measurable skill improvements typically show in our metrics within 3-4 weeks. ",
    },
    {
      question: "Do you offer any guarantees for job placement?",
      answer:
        "We don't guarantee specific job outcomes, but we do guarantee measurable skill improvement. Our data shows that members who complete our full training program experience a 74% higher interview success rate.",
    },
    {
      question: "Is this better than LeetCode?",
      answer:
        "We're not here to compete — we're here to focus. Arkham is for those who want a guided, immersive, and themed experience.",
    },
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const glowVariants = {
    inactive: {
      opacity: 0.2,
      filter: "blur(15px)",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    active: {
      opacity: 0.5,
      filter: "blur(10px)",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div id="faqs" className="second-page min-h-[95vh] p-4" ref={sectionRef}>
      <div className="relative min-h-[95vh] rounded-4xl overflow-hidden sm:pb-0 pb-12">
        {/* Background Image */}
        <motion.img
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0.8 }
          }
          transition={{ duration: 1.5 }}
          src={bg}
          className="absolute w-full h-full object-cover bg"
          alt="Arkham background"
          loading="eager"
        />

        <div className="relative z-10 h-full w-full flex flex-col items-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="sm:text-5xl text-4xl text-center mt-6 neue-montreal text-white/90 tracking-tighter neue-med"
          >
            FAQs
          </motion.h1>

          <motion.p
            initial={{ y: -15, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="sm:text-lg text-base text-center neue-montreal text-transparent bg-gradient-to-r from-white to-[#949494] bg-clip-text neue-med max-w-2xl mb-12 mt-4"
          >
            Alfred Gets These Questions a Lot
          </motion.p>

          {/* FAQ Accordions */}
          <motion.div
            className="w-full max-w-4xl px-4 mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
              >
                <motion.div
                  className="faq-question"
                  onClick={() => handleToggle(index)}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                  }}
                >
                  <h3 className="faq-question-text">{faq.question}</h3>
                  <motion.div
                    className="faq-icon"
                    animate={{
                      rotate: activeIndex === index ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {activeIndex === index ? "−" : "+"}
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      className="faq-answer open"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.4,
                          },
                          opacity: {
                            duration: 0.5,
                            delay: 0.1,
                          },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.3,
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        },
                      }}
                    >
                      <motion.div
                        className="faq-answer-content"
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dynamic glow effect */}
                {activeIndex === index && (
                  <motion.div
                    className="glow-effect"
                    variants={glowVariants}
                    initial="inactive"
                    animate="active"
                    exit="inactive"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
