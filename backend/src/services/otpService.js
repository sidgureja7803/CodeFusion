const crypto = require('crypto');
const nodemailer = require('nodemailer');

// In-memory OTP storage (replace with database in production)
const otpStore = new Map();

/**
 * Generate a random 6-digit OTP
 * @returns {string} - 6-digit OTP
 */
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Store OTP for a user
 * @param {string} email - User's email address
 * @param {string} otp - Generated OTP
 * @param {number} expiryMinutes - OTP expiry time in minutes
 */
const storeOTP = (email, otp, expiryMinutes = 10) => {
  const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
  otpStore.set(email, { otp, expiryTime });
  
  // Set up automatic cleanup after expiry
  setTimeout(() => {
    if (otpStore.has(email) && otpStore.get(email).otp === otp) {
      otpStore.delete(email);
    }
  }, expiryMinutes * 60 * 1000);
};

/**
 * Verify OTP for a user
 * @param {string} email - User's email address
 * @param {string} otp - OTP to verify
 * @returns {boolean} - Whether OTP is valid
 */
const verifyOTP = (email, otp) => {
  if (!otpStore.has(email)) {
    return false;
  }
  
  const storedData = otpStore.get(email);
  
  if (Date.now() > storedData.expiryTime) {
    otpStore.delete(email);
    return false;
  }
  
  if (storedData.otp !== otp) {
    return false;
  }
  
  // OTP verified successfully, remove it from store
  otpStore.delete(email);
  return true;
};

/**
 * Send OTP email to user
 * @param {string} email - User's email address
 * @param {string} otp - OTP to send
 * @returns {Promise<boolean>} - Whether email was sent successfully
 */
const sendOTPEmail = async (email, otp) => {
  try {
    // Create a test account for development
    // In production, use your own SMTP server credentials
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || testAccount.user,
        pass: process.env.EMAIL_PASS || testAccount.pass,
      },
    });
    
    const info = await transporter.sendMail({
      from: '"CodeFusion" <verify@codefusion.dev>',
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568;">CodeFusion Email Verification</h2>
          <p>Hello,</p>
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
    
    console.log('OTP email sent: %s', info.messageId);
    // For development, log the test email URL
    if (testAccount) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};

/**
 * Generate and send OTP to user's email
 * @param {string} email - User's email address
 * @returns {Promise<boolean>} - Whether OTP was sent successfully
 */
const sendVerificationOTP = async (email) => {
  const otp = generateOTP();
  storeOTP(email, otp);
  return await sendOTPEmail(email, otp);
};

module.exports = {
  generateOTP,
  verifyOTP,
  sendVerificationOTP,
};
