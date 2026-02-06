import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import SocialLoginButtons from "../components/SocialLoginButtons";
import gsap from "gsap";

export const SignUp = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating code elements animation
      gsap.to(".floating-code", {
        y: -20,
        rotation: 5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 1.2
      });

      // Form entrance animation
      gsap.fromTo(".signup-form", 
        { 
          opacity: 0, 
          y: 40,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMTYwLCAwLCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]  opacity-40"></div>
      
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
      <div className="floating-code absolute bottom-48 right-32 text-yellow-500/15 dark:text-yellow-400/20 text-2xl font-mono">
        {"[]"}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="signup-form w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl mb-4 shadow-lg">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200 mb-2">
              Join CodeFusion 🚀
            </h1>
            <p className="text-gray-600 dark:text-slate-400">
              Start your coding journey today
            </p>
          </div>

          {/* Main Form Container */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
            {/* Info Message */}
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create your account with
              </p>
            </div>

            {/* Social Login Buttons */}
            <SocialLoginButtons />

            {/* Terms */}
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-6">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-bold transition-colors"
              >
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
