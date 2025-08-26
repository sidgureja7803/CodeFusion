import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OtpVerification from './OtpVerification';
import '../../styles/auth.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

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
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        `${import.meta.env.VITE_API_URL}/auth/register`, 
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );
      
      if (response.data.success) {
        // Show OTP verification screen
        setShowOtp(true);
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response?.data?.message) {
        setErrors({ 
          submit: error.response.data.message 
        });
      } else {
        setErrors({ 
          submit: 'An error occurred during signup. Please try again.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    // Redirect to login page after successful verification
    navigate('/login', { 
      state: { message: 'Email verified successfully! You can now log in.' } 
    });
  };

  if (showOtp) {
    return (
      <OtpVerification 
        email={formData.email} 
        onVerificationSuccess={handleVerificationSuccess} 
      />
    );
  }

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Create an Account</h2>
      
      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label htmlFor="name" className="auth-form-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="auth-form-input"
            placeholder="Enter your full name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
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
            placeholder="Create a password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <div className="auth-form-group">
          <label htmlFor="confirmPassword" className="auth-form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="auth-form-input"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>
        
        <button 
          type="submit" 
          className="auth-form-button"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      <p className="auth-form-link">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default SignupForm;
