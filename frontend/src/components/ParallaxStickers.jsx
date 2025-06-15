import { useState, useEffect, memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import bat from "../assets/images/batrang.png";
import "../styles/ParallaxStickers.css";

const ParallaxStickers = memo(() => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to center of screen
      const x = (e.clientX - window.innerWidth / 2) / 30;
      const y = (e.clientY - window.innerHeight / 2) / 30;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sticker1Variants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      rotate: -120,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const sticker2Variants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      rotate: 360,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        delay: 0.6,
        ease: "easeOut",
      },
    },
  };

  const sticker3Variants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      rotate: -180,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        delay: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={sectionRef} className="stickers-container">
      <motion.div
        className="parallax-wrapper "
        style={{
          transform: `translate(${position.x * 1}px, ${position.y * 1}px)`,
        }}
      >
        <motion.img
          variants={sticker1Variants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          src={bat}
          alt="sticker"
          className="parallax-sticker sticker-1"
        />
      </motion.div>

      <motion.div
        className="parallax-wrapper "
        style={{
          transform: `translate(${position.x * -1}px, ${position.y * -0.8}px)`,
        }}
      >
        <motion.img
          variants={sticker2Variants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          src={bat}
          alt="sticker"
          className="parallax-sticker sticker-2"
        />
      </motion.div>

      <motion.div
        className="parallax-wrapper "
        style={{
          transform: `translate(${position.x * 1.2}px, ${position.y * -1}px)`,
        }}
      >
        <motion.img
          variants={sticker3Variants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          src={bat}
          alt="sticker"
          className="parallax-sticker sticker-3"
        />
      </motion.div>
    </div>
  );
});

export default ParallaxStickers;
