import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import bg from "../assets/images/arkham9.png";
import batLogo from "../assets/images/batrang2.png";
import { Loader } from "../components/Loader";
import eye from "../assets/svgs/eye-sharp.svg";
import eyeOff from "../assets/svgs/eye-off-sharp.svg";

const SignUpSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address"),
    // apply regex for password validation
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { signUp, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    try {
      await signUp(data);
      navigate("/login");
      console.log("sign up data", data);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // Animation variants (same as login)
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

  const ButtonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        visualDuration: 0.2,
        bounce: 0.15,
        mass: 0.2,
        stiffness: 300,
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
        animate={{ scale: 1, opacity: 1 }}
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
        className="spotlight-1 signup-spotlight"
        initial={{ opacity: 0, rotate: "270deg" }}
        animate={{ opacity: 0.3, rotate: "310deg" }}
        transition={{ delay: 0.5, duration: 1.5 }}
      />
      <motion.div
        className="spotlight-2 signup-spotlight"
        initial={{ opacity: 0, rotate: "235deg" }}
        animate={{ opacity: 0.26, rotate: "235deg" }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />

      <motion.div
        className="signup-spotlight-3"
        initial={{ opacity: 0, rotate: "275deg" }}
        animate={{ opacity: 0.26, rotate: "235deg" }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />

      <motion.img
        className="absolute w-[75%] mix-blend-color-dodge"
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
      {isSigningUp && <Loader />}

      <motion.div
        className="z-10 signup-form-container backdrop-blur-md"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="blue-glow"></div>
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
          Create an account to begin training
        </motion.p>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
          variants={containerVariants}
        >
          <motion.div className="signup-form-group" variants={itemVariants}>
            <label htmlFor="name" className="form-label neue-med">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="form-input signup-form-input"
              placeholder="Bruce Wayne"
              required
            />
            {errors.name && (
              <span className="text-red-500/70 neue-reg text-sm">
                {errors.name.message}
              </span>
            )}
          </motion.div>

          <motion.div className="signup-form-group" variants={itemVariants}>
            <label htmlFor="email" className="form-label neue-med">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="form-input signup-form-input"
              placeholder="your.email@example.com"
              required
            />
            {errors.email && (
              <span className="text-red-500/70 neue-reg text-sm">
                {errors.email.message}
              </span>
            )}
          </motion.div>

          <motion.div className="signup-form-group" variants={itemVariants}>
            <label htmlFor="password" className="form-label neue-med">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              className="form-input signup-form-input"
              placeholder="••••••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-3 bottom-6 transform translate-y-1/2 text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <ion-icon name="eye-off-sharp"></ion-icon>
              ) : (
                <ion-icon name="eye-sharp"></ion-icon>
              )}
            </button>
            {errors.password && (
              <span className="text-red-500/70 neue-reg text-sm">
                {errors.password.message}
              </span>
            )}
          </motion.div>

          <motion.div className="signup-form-group" variants={itemVariants}>
            <label htmlFor="confirmPassword" className="form-label neue-med">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword")}
              className="form-input signup-form-input"
              placeholder="••••••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-3 bottom-6 transform translate-y-1/2 text-white cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <ion-icon name="eye-off-sharp"></ion-icon>
              ) : (
                <ion-icon name="eye-sharp"></ion-icon>
              )}
            </button>
            {errors.confirmPassword && (
              <span className="text-red-500/70 neue-reg text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className="signup-button"
            disabled={isSigningUp}
            whileHover={{
              scale: 1,
            }}
            whileTap={{ scale: 0.98 }}
            variants={ButtonVariants}
          >
            <span className="login-btn-star">✦</span> Sign Up
          </motion.button>

          <motion.div
            className="text-center mt-6 neue-reg text-[#adadad]"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link to="/login" className="sign-up-link">
              Login
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};
