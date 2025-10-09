import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { db } from '../libs/db.js';

// In-memory OTP storage (replace with database in production)
const otpStore = new Map();

/**
 * Generate a random 6-digit OTP
 * @param {string} email - User's email address 
 * @returns {string} - 6-digit OTP
 */
export const generateOTP = (email) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  storeOTP(email, otp);
  return otp;
};

/**
 * Store OTP for a user
 * @param {string} email - User's email address
 * @param {string} otp - Generated OTP
 * @param {number} expiryMinutes - OTP expiry time in minutes
 */
const storeOTP = (email, otp, expiryMinutes = 10) => {
  const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
  otpStore.set(email.toLowerCase(), { otp, expiryTime });
  
  // Set up automatic cleanup after expiry
  setTimeout(() => {
    if (otpStore.has(email.toLowerCase()) && otpStore.get(email.toLowerCase()).otp === otp) {
      otpStore.delete(email.toLowerCase());
    }
  }, expiryMinutes * 60 * 1000);
};

/**
 * Send verification email with OTP to user
 * @param {string} email - User's email address
 * @param {string} name - User's name
 * @param {string} otp - OTP to send
 * @returns {Promise<boolean>} - Whether email was sent successfully
 */
export const sendVerificationEmail = async (email, name, otp) => {
  try {
    let testAccount;
    let transportConfig;
    
    // Check for environment variables
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const port = parseInt(process.env.EMAIL_PORT || '587');
      const secure = process.env.EMAIL_SECURE === 'true';
      
      console.log("📧 Email config:", {
        host: process.env.EMAIL_HOST,
        port: port,
        secure: secure,
        user: process.env.EMAIL_USER.substring(0, 5) + "***"
      });
      
      transportConfig = {
        host: process.env.EMAIL_HOST,
        port: port,
        secure: secure, // true for 465, false for other ports
        requireTLS: !secure, // Use STARTTLS for non-secure ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          // Don't fail on invalid certs (for development)
          rejectUnauthorized: false,
          // Explicitly specify TLS version
          minVersion: 'TLSv1.2',
        },
        // Increase timeout for slow connections
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      };
    } else {
      // Use Ethereal for development if no email config
      testAccount = await nodemailer.createTestAccount();
      transportConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      };
    }
    
    const transporter = nodemailer.createTransport(transportConfig);
    
    const fromAddress = process.env.EMAIL_FROM || '"CodeFusion" <verify@codefusion.dev>';
    
    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: 'CodeFusion - Verify Your Email',
      text: `Hello ${name},\n\nYour verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\nBest regards,\nThe CodeFusion Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568;">CodeFusion Email Verification</h2>
          <p>Hello ${name},</p>
          <p>Thank you for registering with CodeFusion. Please verify your email address with the following code:</p>
          <div style="background-color: #edf2f7; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="font-size: 32px; margin: 0; color: #4299e1;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <p>Best regards,<br>The CodeFusion Team</p>
        </div>
      `,
    });
    
    console.log('✅ Verification email sent to %s: %s', email, info.messageId);
    
    // For development, log the test email URL
    if (testAccount) {
      console.log('📧 Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    return false;
  }
};

/**
 * Resend verification OTP
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const resendVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }
    
    // Check if user exists
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // If already verified
    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }
    
    // Generate and send OTP
    const otp = generateOTP(email);
    const emailSent = await sendVerificationEmail(email, user.name, otp);
    
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please try again.'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Verification code sent to your email'
    });
    
  } catch (error) {
    console.error('❌ Error resending verification OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while resending verification code'
    });
  }
};

/**
 * Verify email with OTP
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and OTP are required' 
      });
    }
    
    // Check if OTP exists and is valid
    const emailLower = email.toLowerCase();
    if (!otpStore.has(emailLower)) {
      return res.status(400).json({
        success: false,
        message: 'Verification code is invalid or expired. Please request a new one.'
      });
    }
    
    const storedData = otpStore.get(emailLower);
    
    if (Date.now() > storedData.expiryTime) {
      otpStore.delete(emailLower);
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new one.'
      });
    }
    
    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code. Please try again.'
      });
    }
    
    // OTP is valid, update user as verified
    const user = await db.user.findUnique({
      where: { email: emailLower }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user as verified
    const updatedUser = await db.user.update({
      where: { email: emailLower },
      data: { 
        emailVerified: true,
        lastLogin: new Date() // Update last login time
      }
    });
    
    // Remove OTP from store
    otpStore.delete(emailLower);
    
    // Generate JWT token for automatic login
    const jwt = require('jsonwebtoken');
    const { getCookieConfig } = require('../middleware/cors.middleware.js');
    
    const token = jwt.sign(
      { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    // Set cookie with JWT token
    res.cookie("jwt", token, getCookieConfig());
    
    return res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      token: token,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        emailVerified: true
      }
    });
    
  } catch (error) {
    console.error('❌ Error verifying email:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during verification'
    });
  }
};
