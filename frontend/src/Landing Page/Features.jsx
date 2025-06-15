import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import bg from "../assets/images/arkham3.png";
import batrang from "../assets/images/batrang.png";
import swords from "../assets/images/swords.svg";
import "../styles/SecondPage.css";
import reports from "../assets/images/reports.svg";

export const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
    <div
      id="features"
      className="second-page min-h-[95vh] p-4"
      ref={sectionRef}
    >
      <div className="relative min-h-[95vh] rounded-4xl overflow-hidden">
        {/* Background Image with animation */}
        <motion.img
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0.8 }
          }
          transition={{ duration: 1.5 }}
          src={bg}
          className="absolute w-full h-full sm:object-cover object-fill bg"
          alt="Arkham background"
          loading="eager"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full w-full flex flex-col items-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="sm:text-5xl text-4xl text-center mt-16 neue-montreal text-white/90 tracking-tighter neue-med"
          >
            Features{" "}
            <span className="italic tracking-normal sm:text-5xl text-4xl">
              (you'll love)
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: -15, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="sm:text-lg text-base text-center mt-4 neue-montreal text-transparent bg-gradient-to-r from-white to-[#949494] bg-clip-text neue-med"
          >
            Your very own Alfred — here to prep, guide, and power you through
            every challenge.
          </motion.p>

          {/* cards with animation */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 sm:px-28">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeIn" }}
              className="card"
            >
              <motion.img
                variants={iconVariants}
                whileHover="hover"
                src={swords}
                alt="Card 1"
                className="card-image w-12"
              />
              <motion.h2 className="card-title neue-med">
                Arsenal of Algorithms
              </motion.h2>
              <motion.p className="card-description">
                Alfred wouldn't send you into the field without preparation and
                neither do we. <br /> At Arkham Labs, every coding challenge is
                selected and{" "}
                <motion.span className="bright-text">
                  sequenced to push your limits.
                </motion.span>{" "}
                Each problem is a{" "}
                <motion.span className="bright-text">
                  weapon in your coding arsenal.
                </motion.span>
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeIn" }}
              className="card"
            >
              <motion.img
                variants={iconVariants}
                whileHover="hover"
                src={batrang}
                alt="Card 2"
                className="card-image w-20"
              />
              <h2 className="card-title neue-med">
                Wayne Enterprises Technology
              </h2>
              <p className="card-description ">
                Every hero needs a trusted advisor and elite training. <br />{" "}
                Meet <span className="bright-text">Alfred AI, your mentor</span>{" "}
                who provides intelligent hints, code reviews, and strategic
                guidance. Train with fellow vigilantes through{" "}
                <span className="bright-text">
                  real-time collaborative coding
                </span>{" "}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeIn" }}
              className="card"
            >
              <motion.img
                variants={iconVariants}
                whileHover="hover"
                src={reports}
                alt="Card 3"
                className="card-image w-12"
              />
              <h2 className="card-title neue-med">
                Commissioner Commissioner's Reports
              </h2>
              <p className="card-description">
                Even Batman checks in with Commissioner Commissioner. <br /> Our
                tracking system gives you{" "}
                <span className="bright-text">detailed insights</span> into your
                strengths, weaknesses, and historical performance.{" "}
                <span className="bright-text">
                  Watch your problem-solving improve week by week.
                </span>{" "}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
