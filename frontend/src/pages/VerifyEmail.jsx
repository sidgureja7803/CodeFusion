import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, CheckCircle, ArrowRight, RotateCw, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../libs/axios";
import { useAuthStore } from "../store/useAuthStore";
import ErrorBoundary from "../components/ErrorBoundary";
import "../styles/VerifyEmail.css"; // Import the dedicated CSS file

// Wrap component with ErrorBoundary
export const VerifyEmail = () => {
  return (
    <ErrorBoundary>
      <VerifyEmailContent />
    </ErrorBoundary>
  );
};

// Main component content
const VerifyEmailContent = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const pageRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [emailAddress, setEmailAddress] = useState(location.state?.email || localStorage.getItem('pendingVerificationEmail') || "");
  
  // Get auth store functions
  const { authUser, setAuthUser } = useAuthStore(state => ({
    authUser: state.authUser,
    setAuthUser: (user) => state.set({ authUser: user })
  }));

  // Handle direct access to verify-email page
  useEffect(() => {
    // If no email in state, show form to enter email manually
    if (!emailAddress) {
      // Check if there's an email in localStorage as fallback
      const savedEmail = localStorage.getItem('pendingVerificationEmail');
      
      if (savedEmail) {
        // Use email from localStorage
        console.log("Using email from localStorage:", savedEmail);
        setEmailAddress(savedEmail);
      } else {
        // Redirect to signup if no email available
        toast.error("No email provided. Please sign up first.");
        navigate("/sign-up");
      }
    } else {
      // Save email to localStorage for potential page refresh
      localStorage.setItem('pendingVerificationEmail', emailAddress);
    }
  }, [emailAddress, navigate]);

  // Simple fade-in animation with CSS only
  useEffect(() => {
    // Use a timeout to ensure the component is mounted
    const timer = setTimeout(() => {
      const formElement = document.querySelector('.verify-form');
      if (formElement) {
        formElement.classList.add('visible');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      // Verify the email - the backend now handles login automatically
      const verifyResponse = await axiosInstance.post("/auth/verify-email", {
        email: emailAddress,
        otp: otpCode,
      });

      if (verifyResponse.data.success) {
        // The backend now returns token and user data directly
        const { token, user } = verifyResponse.data;
        
        if (user) {
          // Update auth store with user data
          setAuthUser(user);
          
          // Store token in auth store if cookies aren't working
          useAuthStore.setState({ 
            authToken: token,
            tokenExpiry: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
          });
          
          // Set Authorization header for future requests
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Show a success message with the user's name
          toast.success(`✅ Email verified successfully! Welcome to CodeFusion, ${user.name || 'User'}!`, {
            duration: 5000,
            icon: '🎉'
          });
          
          // Add a small delay for better UX - let the user see the success message
          setTimeout(() => {
            // Navigate to dashboard
            navigate("/dashboard");
          }, 1500);
        } else {
          // Fallback if no user data returned
          toast.success("✅ Email verified successfully! You can now log in.");
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      const errorMessage = error.response?.data?.message || "Verification failed. Please try again.";
      toast.error(errorMessage);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      const response = await axiosInstance.post("/auth/resend-otp", { email: emailAddress });

      if (response.data.success) {
        toast.success("New verification code sent to your email!");
        setTimer(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("Resend error:", error);
      const errorMessage = error.response?.data?.message || "Failed to resend code. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="verify-email-container" ref={pageRef}>
      <div className="verify-form">
        {/* Card */}
        <div className="verify-card">
          {/* Header */}
          <div className="verify-header">
            <div className="verify-icon">
              <Mail size={24} />
            </div>
            <h1 className="verify-title">Verify Your Email</h1>
            
            {emailAddress ? (
              <>
                <p className="verify-subtitle">
                  {location.state?.fromLogin 
                    ? "A new verification code has been sent to"
                    : "We've sent a verification code to"}
                </p>
                <p className="verify-email">{emailAddress}</p>
                
                {location.state?.fromLogin && (
                  <div className="verify-warning">
                    <AlertTriangle size={16} />
                    <span>Your email wasn't verified during signup. Please verify to access your account.</span>
                  </div>
                )}
              </>
            ) : (
              <div className="email-input-container">
                <p className="verify-subtitle">Enter your email to receive a verification code</p>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="your.email@example.com"
                  className="email-input"
                />
                <button 
                  className="send-code-button"
                  onClick={handleResend}
                  disabled={!emailAddress || isResending}
                >
                  {isResending ? "Sending..." : "Send Code"}
                </button>
              </div>
            )}
          </div>

          {/* Form - Only show when email is provided */}
          {emailAddress && (
            <form onSubmit={handleSubmit}>
              <div className="otp-input-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="otp-input"
                    disabled={isLoading}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || otp.join("").length !== 6}
                className="verify-button"
              >
                {isLoading ? (
                  <>
                    <RotateCw className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Verify Email
                  </>
                )}
              </button>
            </form>
          )}

          {/* Resend Code - Only show when email is provided */}
          {emailAddress && (
            <div className="resend-container">
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="resend-button"
                >
                  {isResending ? "Sending..." : "Resend verification code"}
                </button>
              ) : (
                <p className="resend-timer">
                  Resend code in {timer}s
                </p>
              )}
            </div>
          )}

          {/* Help Text */}
          <div className="help-box">
            <p className="help-text">
              💡 Check your spam folder if you don't see the email. The code expires in 10 minutes.
            </p>
          </div>
        </div>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/sign-up")}
          className="back-button"
        >
          ← Back to Sign Up
        </button>
      </div>
    </div>
  );
};

