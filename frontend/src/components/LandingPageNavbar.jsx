import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo2.png";

export const LandingPageNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    // Close mobile menu if open
    if (isOpen) setIsOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      // Use smooth scrolling behavior
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Define navigation links
  const navLinks = [
    { name: "Features", id: "features" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Pricing", id: "pricing" },
    { name: "FAQs", id: "faqs" },
  ];

  return (
    <motion.div
      className="landing-page-navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 14,
        delay: 0.2,
      }}
    >
      <div className="flex justify-between items-center px-4 py-2 rounded-full w-[95%] mx-auto">
        <div className="logo w-[100px] h-auto z-50">
          <img src={logo} alt="logo" />
        </div>

        {/* Mobile hamburger button */}
        <motion.div
          className="hamburger-menu"
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className={`hamburger-line line1 ${isOpen ? "active" : ""}`}
          ></div>
          <div
            className={`hamburger-line line2 ${isOpen ? "active" : ""}`}
          ></div>
          <div
            className={`hamburger-line line3 ${isOpen ? "active" : ""}`}
          ></div>
        </motion.div>

        {/* Desktop menu */}
        <div className="hidden lg:block">
          <ul className="neue-med">
            {navLinks.map((link) => (
              <motion.li
                key={link.id}
                className="inline-block px-4 py-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="nav-link-container cursor-pointer"
                  onClick={() => scrollToSection(link.id)}
                >
                  <span className="nav-link-text">{link.name}</span>
                  <span className="nav-link-text-clone">{link.name}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Desktop buttons */}
        <div className="hidden lg:flex gap-4">
          <motion.button className="text-[#00105f] sign-in-btn hover:text-[#000] neue-med ease-in-out">
            <Link to="/login">Login</Link>
          </motion.button>

          <Link to="/sign-up">
            <motion.button className="text-[#00105f] px-4 py-2 neue-med rounded-full sign-up-btn cursor-pointer">
              Sign Up <span className="inline-block ml-1">✦</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`mobile-menu lg:hidden ${isOpen ? "open" : ""}`}
        initial={false}
        animate={{ height: isOpen ? "100vh" : 0, opacity: isOpen ? 1 : 1 }}
        transition={{
          duration: 0.2,
          ease: "anticipate",
        }}
      >
        <ul className="pt-12 pb-8 flex flex-col items-center neue-med">
          {navLinks.map((link) => (
            <motion.li
              key={link.id}
              className="py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="mobile-nav-link cursor-pointer"
                onClick={() => scrollToSection(link.id)}
              >
                <span>{link.name}</span>
              </div>
            </motion.li>
          ))}
          <div className="flex flex-col gap-4 mt-4 items-center w-full">
            <Link to="/login">
              <motion.button
                className="text-[#00105f] sign-in-btn hover:text-[#000] neue-med transition duration-300 ease-in-out w-[80%]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Login
              </motion.button>
            </Link>
            <Link to="/sign-up">
              <motion.button className="text-[#00105f] px-4 py-2 neue-med rounded-full transition duration-300 ease-in-out sign-up-btn">
                Sign Up <span className="inline-block ml-1">✦</span>
              </motion.button>
            </Link>
          </div>
        </ul>
      </motion.div>
    </motion.div>
  );
};
