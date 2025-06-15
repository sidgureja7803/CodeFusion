import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/useAuthStore";
import { z } from "zod";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import bg from "../assets/images/arkham6.png";
import batLogo from "../assets/images/batrang2.png";
import { Loader } from "../components/Loader";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(2, "Password must be at least 2 characters long"),
});

export const Login = () => {
  const navigate = useNavigate();

  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const loginButtonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -180 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black w-full flex justify-center items-center login-container">
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 1.8 }}
      >
        <img
          src={bg}
          alt="Arkham background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Spotlight effects */}
      <motion.div
        className="spotlight-1"
        initial={{ opacity: 0, rotate: "270deg" }}
        animate={{ opacity: 0.3, rotate: "310deg" }}
        transition={{ delay: 0.5, duration: 1.5 }}
      />
      <motion.div
        className="spotlight-3"
        initial={{ opacity: 0, rotate: "240deg" }}
        animate={{ opacity: 0.26, rotate: "208deg" }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />
      <motion.div
        className="spotlight-2"
        initial={{ opacity: 0, rotate: "240deg" }}
        animate={{ opacity: 0.3, rotate: "208deg" }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />

      <motion.img
        className="absolute w-[75%] mix-blend-color-dodge "
        src={batLogo}
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Back to home button */}
      <motion.div
        className="absolute top-5 left-5 text-white/70 transition-all duration-300 hover:text-white ease-linear"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link to="/" className="back-to-home neue-med">
          ← Back to Home
        </Link>
      </motion.div>

      {/* Loader */}
      {isLoggingIn && <Loader />}

      {/* Login Form */}

      <motion.div
        className="z-10 login-form-container backdrop-blur-md"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="green-glow"></div>

        {/* Logo */}
        <motion.div className="login-logo-container" variants={logoVariants}>
          <img
            src={batLogo}
            alt="Arkham Labs"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="login-logo"
          />
        </motion.div>

        <motion.h1
          className="nulshock tracking-[-2px] text-3xl text-center mb-2 text-white/80"
          variants={itemVariants}
        >
          Arkham Labs
        </motion.h1>

        <motion.p
          className="text-center text-[#adadad] mb-8 neue-reg"
          variants={itemVariants}
        >
          Login to continue your training
        </motion.p>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
          variants={containerVariants}
        >
          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="email" className="form-label neue-med">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="form-input"
              placeholder="your.email@example.com"
              required
            />
          </motion.div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="password" className="form-label neue-med">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              className="form-input"
              placeholder="••••••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-3 bottom-[28px] transform -translate-y-1/2 text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <ion-icon name="eye-off-sharp"></ion-icon>
              ) : (
                <ion-icon name="eye-sharp"></ion-icon>
              )}
            </button>
            <motion.div className="text-right mt-1" variants={itemVariants}>
              <Link to="/forgot-password" className="forgot-password neue-reg">
                Forgot password?
              </Link>
            </motion.div>
          </motion.div>

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{
              scale: 1,
            }}
            whileTap={{ scale: 0.98 }}
            variants={loginButtonVariants}
            disabled={isLoggingIn}
          >
            <span className="login-btn-star">✦</span> Login
          </motion.button>

          <motion.div
            className="text-center mt-6 neue-reg text-[#adadad]"
            variants={itemVariants}
          >
            Don't have an account?{" "}
            <Link to="/sign-up" className="sign-up-link">
              Sign up
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};
