import React from "react";
import { motion } from "framer-motion";
import "../styles/Footer.css";
// Using CSS gradient background instead of batman image

export const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 1.1, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0, filter: "blur(20px)" },
    animate: {
      opacity: [0.2, 0.5, 0.2],
      filter: "blur(15px)",
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const inputVariants = {
    rest: { scale: 1 },
    focus: {
      scale: 1.02,
      borderColor: "rgba(255,255,255,0.5)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(255,255,255,0.25)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  const navLinks = [
    { name: "Features", id: "features" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Pricing", id: "pricing" },
    { name: "FAQs", id: "faqs" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/sidgureja" },
    { name: "Twitter", href: "https://x.com/sidgureja" },
    { name: "Github", href: "https://github.com/sidgureja7803" },
    { name: "Instagram", href: "https://www.instagram.com/sidgureja" },
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

  return (
    <motion.div
      id="footer"
      className="min-h-[80vh] w-full flex flex-col justify-end items-center relative px-4"
    >
      <motion.div
        className="relative bg-[#0d0d0d] w-full min-h-[80vh] flex flex-col justify-start items-center rounded-t-4xl overflow-hidden pb-24"
        initial={{ y: 100, opacity: 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          type: "tween",
          duration: 1.5,
          delay: 0.2,
          ease: "anticipate",
        }}
      >
        {/* Background Gradient */}
        <div className="footer">
          <motion.div
            initial={{ scale: 1.1, opacity: 0.7 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2 }}
            className="z-[1] absolute pointer-events-none bottom-1 sm:bottom-0 left-0 w-full h-full bg-gradient-to-t from-slate-900 via-purple-900/50 to-transparent"
            style={{
              backgroundImage: "linear-gradient(to top, #0f172a, #1e1b4b, #312e81, transparent)",
            }}
          />
        </div>

        {/* Pattern Overlay with Animation */}
        <motion.div
          className="pattern-overlay"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Animated Glow Effect */}
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute top-[-500px] left-[30%] w-[800px] h-[700px] bg-gradient-radial from-[rgba(255,255,255,0.9)] to-transparent rounded-full z-[1] pointer-events-none"
        />

        {/* Main Footer Content */}
        <motion.div
          className="z-[2] relative w-full max-w-full px-4 flex flex-col items-center footer"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="footer-grid max-w-5xl"
            variants={containerVariants}
          >
            <motion.div className="footer-column" variants={itemVariants}>
              <motion.h3
                className="footer-heading"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                viewport={{ once: true }}
              >
                Explore
              </motion.h3>
              <ul className="footer-links">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.id}
                    variants={itemVariants}
                    custom={link.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.a
                      whileHover={{ x: 5, color: "#ffffff" }}
                      transition={{ type: "tween", duration: 0.2, delay: 0.1 }}
                      onClick={() => scrollToSection(link.id)}
                      className="cursor-pointer"
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="footer-column" variants={itemVariants}>
              <motion.h3
                className="footer-heading"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Company
              </motion.h3>
              <ul className="footer-links">
                {["About Us", "Careers", "Contact", "Privacy Policy"].map(
                  (item, i) => (
                    <motion.li
                      key={item}
                      variants={itemVariants}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                        whileHover={{ x: 5, color: "#ffffff" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item}
                      </motion.a>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>

            <motion.div className="footer-column" variants={itemVariants}>
              <motion.h3
                className="footer-heading"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Socials
              </motion.h3>
              <ul className="footer-links">
                {socialLinks.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    custom={item.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                      whileHover={{ x: 5, color: "#ffffff" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="footer-column newsletter"
              variants={itemVariants}
            >
              <motion.h3
                className="footer-heading"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Join the League
              </motion.h3>
              <motion.p
                className="footer-text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Get early access and training tips delivered to your inbox
              </motion.p>
              <motion.div
                className="email-signup"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 70, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.input
                  type="email"
                  placeholder="Your email"
                  className="footer-input"
                  variants={inputVariants}
                  initial="rest"
                  whileFocus="focus"
                />
                <motion.button
                  className="footer-button"
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.span
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    ✦
                  </motion.span>{" "}
                  Join
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Copyright Section */}
          <motion.div
            className="copyright sm:mt-[9.5em] sm:mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>
              &copy; {new Date().getFullYear()} CodeFusion. All rights
              reserved.
            </p>
            <motion.p
              className="credit"
              animate={{
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 8px rgba(255,255,255,0.3)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Code Together. Build Better. Deploy Faster.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Large CodeFusion Text */}
        <motion.h1
          className="sepulture z-[2] absolute bottom-0 sm:text-[280px] text-6xl pointer-events-none select-none text-[#767676] mix-blend-color-dodge tracking-tight"
          variants={logoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          CodeFusion
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};
