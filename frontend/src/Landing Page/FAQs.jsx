import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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

  return (
    <div id="faqs" className="min-h-screen p-4 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDUwIDAgTCAwIDAgMCA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-35"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col items-center py-20">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about CodeFusion and collaborative coding.
          </p>
        </motion.div>

        {/* FAQ Accordions */}
        <div className="w-full max-w-4xl px-4 mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500"
                whileHover={{ scale: 1.01 }}
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                }}
              >
                <motion.button
                  className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none group"
                  onClick={() => handleToggle(index)}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="text-white font-bold text-xl group-hover:text-emerald-200 transition-colors duration-300">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300"
                  >
                    <ChevronDown className="w-6 h-6" />
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
                      <div className="px-8 pb-6 border-t border-white/10">
                        <motion.p
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="text-gray-300 leading-relaxed pt-6 text-lg"
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
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-300 mb-8">
            Still have questions? We're here to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
