import React, { useRef } from "react";
import { delay, motion, useInView } from "framer-motion";
import bg from "../assets/images/arkham3.png";
import batrang from "../assets/images/batrang.png";
import "../styles/Pricing.css";

export const Pricing = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Animation for the batrang icon
  const iconVariants = {
    hidden: { scale: 0.6, opacity: 0, rotate: -20 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.4,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <div id="pricing" className="min-h-[95vh] p-4" ref={sectionRef}>
      <div className="relative min-h-[95vh] rounded-4xl overflow-hidden sm:pb-0 pb-12">
        {/* Background Image with animation */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0.8 }
          }
          transition={{ duration: 1.5 }}
          src={bg}
          className="absolute w-full h-full sm:object-cover object-fill bg"
          alt="Arkham background"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full w-full flex flex-col items-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="sm:text-5xl text-4xl text-center mt-16 neue-montreal text-white/90 tracking-tighter neue-med"
          >
            Simple Pricing. No Riddles.
          </motion.h1>
          <motion.p
            initial={{ y: -15, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="sm:text-lg text-base text-center mt-4 neue-montreal text-transparent bg-gradient-to-r from-white to-[#949494] bg-clip-text neue-med"
          >
            Whether you're testing the waters or going full vigilante, we've got
            a plan.
          </motion.p>

          {/* cards */}
          <div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 sm:px-24"
          >
            <motion.div
              className="card pricing-card"
              custom={0}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeIn" }}
            >
              <motion.div
                className="w-24 text-4xl mb-2"
                initial={{ scale: 0, rotate: -45 }}
                animate={
                  isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }
                }
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3,
                }}
              >
                ✨
              </motion.div>
              <h2 className="neue-med">Free Tier</h2>
              <h3 className="card-title neue-med">₹0 /forever</h3>
              <p className="mb-6 neue-med">Perfect for casual coders</p>
              <p className="card-description">
                ✦ Try daily challenges <br />✦ Explore a few problem sets <br />{" "}
                ✦ Community solutions <br />✦ Basic progress tracking <br />✦
                Public leaderboards <br />✦ Get a feel for the platform
                <span className="bright-text"></span>{" "}
              </p>
            </motion.div>

            <motion.div
              className="card pricing-card"
              custom={1}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeIn" }}
            >
              <div className="w-full flex items-center justify-center">
                <motion.div className="badge neue-med" initial="initial">
                  💫 User's choice
                </motion.div>
              </div>

              <motion.div
                className="w-24 text-4xl mb-4"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5,
                }}
              >
                ⚡
              </motion.div>
              <h2 className="neue-med">Pro Plan</h2>
              <h3 className="card-title neue-med">₹299/month</h3>
              <p className="mb-6 neue-med">For the serious interview prepper</p>
              <p className="card-description">
                ✦ Everything in the Free Tier <br />✦ Full problem vault
                <br />✦ Mock interviews <br />✦ Smart tracking and insights{" "}
                <br />✦ Resume reviews
              </p>
            </motion.div>

            <motion.div
              className="card pricing-card"
              custom={2}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeIn" }}
            >
              <motion.img
                src={batrang}
                alt="Card 3"
                className="card-image w-24"
                variants={iconVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
              />
              <h2 className="neue-med">
                "Bat Signal" Plan <br />
              </h2>
              <h3 className="card-title neue-med">Contact Us</h3>
              <p className="mb-6 neue-med">For institutions and enterprise</p>
              <p className="card-description">
                ✦ Everything in the Pro Plan <br />✦ Custom training and
                advanced analytics.
                <br />✦ Early access to new features
                <br />✦ VIP Discord access <br />✦ Guaranteed feedback on
                solutions
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
