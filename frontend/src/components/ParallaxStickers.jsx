import { useState, useEffect, memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
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

  // Code snippet components
  const CodeSnippet1 = () => (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-xs font-mono text-blue-300">
        <div className="text-purple-400">const</div>
        <div className="text-blue-300">collaborate = () =&gt; {"{"}</div>
        <div className="text-green-400 ml-4">return "magic";</div>
        <div className="text-blue-300">{"}"}</div>
      </div>
    </div>
  );

  const CodeSnippet2 = () => (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-xs font-mono">
        <div className="text-orange-400">function</div>
        <div className="text-cyan-300">buildTogether() {"{"}</div>
        <div className="text-pink-400 ml-4">AI.assist();</div>
        <div className="text-cyan-300">{"}"}</div>
      </div>
    </div>
  );

  const CodeSnippet3 = () => (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-xs font-mono">
        <div className="text-yellow-400">// Real-time sync</div>
        <div className="text-green-300">sync.realTime()</div>
        <div className="text-blue-400">.collaborate()</div>
        <div className="text-purple-400">.deploy();</div>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="stickers-container">
      <motion.div
        className="parallax-wrapper"
        style={{
          transform: `translate(${position.x * 1}px, ${position.y * 1}px)`,
        }}
      >
        <motion.div
          variants={sticker1Variants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="parallax-sticker sticker-1"
        >
          <CodeSnippet1 />
        </motion.div>
      </motion.div>

      <motion.div
        className="parallax-wrapper"
        style={{
          transform: `translate(${position.x * -1}px, ${position.y * -0.8}px)`,
        }}
      >
        <motion.div
          variants={sticker2Variants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="parallax-sticker sticker-2"
        >
          <CodeSnippet2 />
        </motion.div>
      </motion.div>

      <motion.div
        className="parallax-wrapper"
        style={{
          transform: `translate(${position.x * 1.2}px, ${position.y * -1}px)`,
        }}
      >
        <motion.div
          variants={sticker3Variants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="parallax-sticker sticker-3"
        >
          <CodeSnippet3 />
        </motion.div>
      </motion.div>
    </div>
  );
});

export default ParallaxStickers;
