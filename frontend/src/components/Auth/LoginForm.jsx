import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import OtpVerification from './OtpVerification';
import '../../styles/auth.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const successMessage = location.state?.message || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`, 
        {
          email: formData.email,
          password: formData.password
        }
      );
      
      if (response.data.success) {
        // Redirect to dashboard on successful login
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // If email not verified, show OTP verification screen
      if (error.response?.data?.requireVerification) {
        setShowOtp(true);
      } else if (error.response?.data?.message) {
        setErrors({ 
          submit: error.response.data.message 
        });
      } else {
        setErrors({ 
          submit: 'Invalid email or password. Please try again.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    // Redirect to dashboard after successful verification
    navigate('/dashboard');
  };

  const handleResendOtp = () => {
    // Notify user that OTP was resent
    setErrors({
      ...errors,
      submit: 'A new verification code has been sent to your email.'
    });
  };

  if (showOtp) {
    return (
      <OtpVerification 
        email={formData.email} 
        onVerificationSuccess={handleVerificationSuccess}
        onResendOtp={handleResendOtp}
      />
    );
  }

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Log In</h2>
      
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      
      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label htmlFor="email" className="auth-form-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="auth-form-input"
            placeholder="Enter your email"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="auth-form-group">
          <label htmlFor="password" className="auth-form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="auth-form-input"
            placeholder="Enter your password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <button 
          type="submit" 
          className="auth-form-button"
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
      
      <p className="auth-form-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
