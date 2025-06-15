import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";

export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background gradient
      gsap.to(".faqs-bg", {
        backgroundPosition: "200% 200%",
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // Floating help icons animation
      gsap.to(".floating-help", {
        y: -12,
        rotation: 5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What programming languages does CodeFusion support?",
      answer: "CodeFusion supports all major programming languages including JavaScript, Python, Java, C++, TypeScript, Go, Rust, and many more. Our AI assistant is trained on multiple languages to provide accurate suggestions and help."
    },
    {
      question: "How does real-time collaboration work?",
      answer: "Our real-time collaboration uses operational transformation to sync code changes instantly across all participants. You can see live cursors, share selections, and even voice/video chat while coding together. It's like Google Docs but for code."
    },
    {
      question: "Is my code secure and private?",
      answer: "Absolutely. We use end-to-end encryption for all code transmission, and your private repositories remain completely private. We're SOC 2 compliant and follow industry best practices for data security. You can also use our on-premise solution for maximum security."
    },
    {
      question: "Can I integrate CodeFusion with my existing tools?",
      answer: "Yes! CodeFusion integrates seamlessly with popular tools like GitHub, GitLab, Slack, Discord, Jira, and more. We also provide APIs and webhooks for custom integrations with your workflow."
    },
    {
      question: "How accurate is the AI assistant?",
      answer: "Our AI assistant is powered by state-of-the-art language models trained specifically on code. It provides contextually relevant suggestions with high accuracy and learns from your coding patterns to improve over time."
    },
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes real-time collaboration for up to 2 users, basic AI assistance, 5 projects, community support, and basic code analysis. It's perfect for individual developers or small teams getting started."
    },
    {
      question: "Can I use CodeFusion for educational purposes?",
      answer: "Absolutely! We offer special educational pricing and features for schools and universities. Teachers can create classrooms, assign coding exercises, and monitor student progress in real-time."
    }
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };

  return (
    <div id="faqs" className="min-h-[95vh] p-4 relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background */}
      <div className="faqs-bg absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900"
           style={{
             backgroundSize: "400% 400%",
             backgroundImage: "linear-gradient(-45deg, #0f172a, #064e3b, #312e81, #1e293b, #0f172a)"
           }}>
        
        {/* Floating help icons */}
        <div className="floating-help absolute top-32 left-16 w-8 h-8 text-emerald-400/30">
          <HelpCircle className="w-full h-full" />
        </div>
        <div className="floating-help absolute top-48 right-24 w-6 h-6 text-blue-400/30">
          <HelpCircle className="w-full h-full" />
        </div>
        <div className="floating-help absolute bottom-32 left-32 w-10 h-10 text-cyan-400/30">
          <HelpCircle className="w-full h-full" />
        </div>
        <div className="floating-help absolute bottom-48 right-16 w-7 h-7 text-green-400/30">
          <HelpCircle className="w-full h-full" />
        </div>
        
        {/* Geometric shapes */}
        <div className="absolute top-24 right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-24 left-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDUwIDAgTCAwIDAgMCA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDQpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-25"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-16">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="sm:text-5xl text-4xl text-center mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent font-bold"
        >
          Frequently Asked Questions
        </motion.h1>

        <motion.p
          initial={{ y: -15, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="sm:text-lg text-base text-center text-gray-300 max-w-2xl mb-12 mt-4 px-4"
        >
          Everything you need to know about CodeFusion and collaborative coding.
        </motion.p>

        {/* FAQ Accordions */}
        <motion.div
          className="w-full max-w-4xl px-4 mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-4"
            >
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.01 }}
              >
                <motion.button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none group"
                  onClick={() => handleToggle(index)}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="text-white font-semibold text-lg group-hover:text-emerald-200 transition-colors duration-300">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 border-t border-white/10">
                        <motion.p
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="text-gray-300 leading-relaxed pt-4"
                        >
                          {item.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
          <p className="text-gray-300 mb-6">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
