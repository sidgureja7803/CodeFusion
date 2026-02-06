import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import SocialLoginButtons from "../components/SocialLoginButtons";
import gsap from "gsap";

export const Login = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating code elements animation
      gsap.to(".floating-code", {
        y: -15,
        rotation: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.8
      });

      // Form entrance animation
      gsap.fromTo(".login-form", 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out"
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" ref={pageRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMTYwLCAwLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      
      {/* Floating Elements */}
      <div className="floating-code absolute top-20 left-16 text-orange-400/15 dark:text-orange-400/20 text-2xl font-mono">
        {"</>"}
      </div>
      <div className="floating-code absolute top-32 right-20 text-yellow-400/15 dark:text-yellow-400/20 text-xl font-mono">
        {"{}"}
      </div>
      <div className="floating-code absolute bottom-32 left-20 text-orange-500/15 dark:text-orange-400/20 text-lg font-mono">
        {"()"}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <motion.div
          className="login-form w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl mb-4 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Code2 className="w-7 h-7 text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200 mb-2">
              Welcome Back! 👋
            </h1>
            <p className="text-gray-600 dark:text-slate-400">
              Continue your coding journey
            </p>
          </div>

          {/* Main Form Container */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
            {/* Info Message */}
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sign in with your preferred account
              </p>
            </div>

            {/* Social Login Buttons */}
            <SocialLoginButtons />
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-bold transition-colors"
              >
                Sign up for free →
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
