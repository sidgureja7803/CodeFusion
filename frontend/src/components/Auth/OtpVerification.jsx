import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const OtpVerification = ({ email, onVerificationSuccess, onResendOtp }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  
  // Setup countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);
  
  // Focus on first input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  // Handle input change
  const handleChange = (index, e) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character if multiple are entered
    setOtp(newOtp);
    
    // Clear any previous errors
    if (error) setError('');
    
    // Auto-move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    
    // Auto-submit when all digits are filled
    if (index === 5 && value && !newOtp.includes('')) {
      verifyOtp(newOtp.join(''));
    }
  };
  
  // Handle key down events (for backspace navigation)
  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  // Verify OTP
  const verifyOtp = async (otpCode = otp.join('')) => {
    if (otpCode.length !== 6) {
      setError('Please enter a complete 6-digit code');
      return;
    }
    
    setVerifying(true);
    setError('');
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify-email`,
        { email, otp: otpCode }
      );
      
      if (response.data.success) {
        if (onVerificationSuccess) {
          onVerificationSuccess();
        } else {
          navigate('/login');
        }
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(
        err.response?.data?.message || 
        'Invalid or expired verification code. Please try again.'
      );
    } finally {
      setVerifying(false);
    }
  };
  
  // Resend OTP
  const handleResendOtp = async () => {
    if (!canResend) return;
    
    setError('');
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/resend-otp`,
        { email }
      );
      
      if (response.data.success) {
        setCountdown(60);
        setCanResend(false);
        
        // Reset OTP inputs
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
        
        if (onResendOtp) {
          onResendOtp();
        }
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(
        err.response?.data?.message || 
        'Failed to resend verification code. Please try again.'
      );
    }
  };
  
  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      
      // Focus last input
      inputRefs.current[5].focus();
      
      // Auto-submit
      verifyOtp(pastedData);
    }
  };

  return (
    <div className="otp-verification">
      <h2>Email Verification</h2>
      <p className="verification-info">
        We've sent a verification code to <strong>{email}</strong>.
        Please enter the code below to verify your email.
      </p>
      
      <div className="otp-inputs" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="otp-input"
            disabled={verifying}
          />
        ))}
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="verification-actions">
        <button 
          className="verify-button"
          onClick={() => verifyOtp()}
          disabled={verifying || otp.includes('')}
        >
          {verifying ? 'Verifying...' : 'Verify Email'}
        </button>
        
        <div className="resend-section">
          <p className="resend-text">
            {canResend ? (
              <button 
                className="resend-button" 
                onClick={handleResendOtp}
              >
                Resend Code
              </button>
            ) : (
              <span>Resend code in {countdown}s</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
