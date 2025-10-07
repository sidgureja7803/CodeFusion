import React, { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram, Mail, MessageCircle, BookOpen, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const footerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const navLinks = [
    { name: "Features", id: "features" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Pricing", id: "pricing" },
    { name: "FAQs", id: "faqs" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/sidgureja", icon: <Linkedin size={18} /> },
    { name: "Twitter", href: "https://x.com/sidgureja", icon: <Twitter size={18} /> },
    { name: "Github", href: "https://github.com/sidgureja7803", icon: <Github size={18} /> },
    { name: "Instagram", href: "https://www.instagram.com/sidgureja", icon: <Instagram size={18} /> },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  return (
    <div id="footer" className="py-20 px-4 relative overflow-hidden bg-[#0a101f]" ref={footerRef}>
      {/* Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        {/* Subtle glow effect */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#0070f3]/5 rounded-full blur-[120px] opacity-30"></div>
      </div>

      {/* Content Layer */}
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="w-full"
        >
          <div className="border-b border-[#0070f3]/10 pb-16 mb-16">
            {/* Logo and Main CTA */}
            <motion.div variants={childVariants} className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Code</span>
                <span className="bg-gradient-to-r from-[#0070f3] via-[#9333ea] to-[#0070f3] bg-clip-text text-transparent">Fusion</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
                Code Together. Build Better. Deploy Faster.
              </p>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div variants={childVariants} className="max-w-md mx-auto">
              <div className="text-center mb-4">
                <h3 className="text-white font-medium mb-1">Stay updated</h3>
                <p className="text-gray-400 text-sm">Join our newsletter for the latest features and updates</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-[#112240] border border-blue-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 112, 243, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-[#0070f3] text-white font-medium rounded-lg transition-all duration-300 sm:w-auto w-full"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Footer Links Grid */}
          <motion.div variants={childVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-16">
            {/* Navigation Links */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-5 text-lg">Product</h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <motion.button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center gap-1 group"
                      whileHover={{ color: "#ffffff" }}
                    >
                      {link.name}
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-5 text-lg">Company</h3>
              <ul className="space-y-3">
                <li>
                  <motion.a
                    href="#about"
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center gap-1 group"
                    whileHover={{ color: "#ffffff" }}
                  >
                    About Us
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#careers"
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center gap-1 group"
                    whileHover={{ color: "#ffffff" }}
                  >
                    Careers
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#contact"
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center gap-1 group"
                    whileHover={{ color: "#ffffff" }}
                  >
                    Contact
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </motion.a>
                </li>
                <li>
                  <Link to="/privacy-policy">
                    <motion.span
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center gap-1 group cursor-pointer"
                      whileHover={{ color: "#ffffff" }}
                    >
                      Privacy Policy
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service">
                    <motion.span
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center gap-1 group cursor-pointer"
                      whileHover={{ color: "#ffffff" }}
                    >
                      Terms of Service
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </motion.span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-5 text-lg">Connect</h3>
              <ul className="space-y-3">
                {socialLinks.map((item) => (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm flex items-center gap-2 group"
                      whileHover={{ color: "#ffffff" }}
                    >
                      <span className="text-blue-400 group-hover:text-white transition-colors duration-200">{item.icon}</span>
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-5 text-lg">Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <Mail size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-400 block">Email</span>
                    <a href="mailto:support@codefusion.dev" className="text-white hover:text-blue-300 transition-colors duration-200">support@codefusion.dev</a>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <MessageCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-400 block">Discord</span>
                    <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200">Join our community</a>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <BookOpen size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-400 block">Documentation</span>
                    <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200">Read our guides</a>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Bottom Copyright */}
          <motion.div
            variants={childVariants}
            className="border-t border-blue-500/10 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4"
          >
            <div>
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} CodeFusion. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200">Privacy</Link>
              <span className="text-gray-700">•</span>
              <Link to="/terms-of-service" className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200">Terms</Link>
              <span className="text-gray-700">•</span>
              <a href="#cookies" className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200">Cookies</a>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm">
                Made with <span className="text-red-500">❤️</span> for developers worldwide
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
