import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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
      answer: "Our AI assistant is powered by GPT-5, the most advanced language model available, specifically fine-tuned for code. It provides contextually relevant suggestions with exceptional accuracy, understands complex codebases, and learns from your coding patterns to improve over time."
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <div id="faqs" className="min-h-screen py-24 px-4 relative overflow-hidden bg-[#0a101f]" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        {/* Subtle glow effect */}
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0070f3]/5 rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#9333ea]/5 rounded-full blur-[120px] opacity-20"></div>
      </div>

      {/* Content Layer */}
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Frequently Asked </span>
              <span className="bg-gradient-to-r from-[#0070f3] via-[#9333ea] to-[#0070f3] bg-clip-text text-transparent">Questions</span>
            </h2>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about CodeFusion and collaborative coding with GPT-5.
            </p>
          </motion.div>

          {/* FAQ Accordions */}
          <div className="w-full max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-4"
              >
                <motion.div
                  className="bg-[#112240]/80 border border-blue-500/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/20 hover:shadow-md hover:shadow-blue-500/5"
                  whileHover={{ y: -2 }}
                >
                <motion.button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-0 group"
                  onClick={() => handleToggle(index)}
                  whileTap={{ scale: 0.995 }}
                >
                  <span className="text-white font-medium text-base md:text-lg group-hover:text-blue-300 transition-colors duration-200 pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="text-blue-500 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 border-t border-blue-500/10">
                        <motion.p
                          initial={{ y: -5, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -5, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-400 leading-relaxed pt-4 text-sm md:text-base"
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
        </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center bg-[#112240]/80 border border-blue-500/20 rounded-xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Still have questions?</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Our support team is ready to assist you with any inquiries
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 112, 243, 0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 bg-[#0070f3] text-white font-medium rounded-lg transition-all duration-200"
              >
                <MessageSquare size={18} />
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
