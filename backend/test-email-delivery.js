// Test script for email delivery
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmailDelivery() {
  console.log('🧪 Testing email delivery...');
  
  try {
    // Check if required environment variables are set
    const requiredVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
    const missingVars = requiredVars.filter(v => !process.env[v]);
    
    if (missingVars.length > 0) {
      console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
      return false;
    }
    
    // Log configuration (without showing full password)
    console.log('📧 Email configuration:');
    console.log(`- Host: ${process.env.EMAIL_HOST}`);
    console.log(`- Port: ${process.env.EMAIL_PORT}`);
    console.log(`- Secure: ${process.env.EMAIL_SECURE === 'true'}`);
    console.log(`- User: ${process.env.EMAIL_USER}`);
    console.log(`- Pass: ${process.env.EMAIL_PASS ? '********' : 'not set'}`);
    console.log(`- From: ${process.env.EMAIL_FROM || process.env.EMAIL_USER}`);
    
    // Check for spaces in EMAIL_USER and EMAIL_PASS
    if (process.env.EMAIL_USER !== process.env.EMAIL_USER.trim()) {
      console.error('❌ EMAIL_USER contains leading or trailing spaces');
      console.log(`- Current value: "${process.env.EMAIL_USER}"`);
      console.log(`- Corrected value: "${process.env.EMAIL_USER.trim()}"`);
      console.log('Please update your .env file to remove these spaces');
    }
    
    if (process.env.EMAIL_PASS !== process.env.EMAIL_PASS.trim()) {
      console.error('❌ EMAIL_PASS contains leading or trailing spaces');
      console.log('Please update your .env file to remove these spaces');
    }
    
    // Create test email
    const testEmail = 'test@example.com';
    const testName = 'Test User';
    const testOTP = '123456';
    
    // Create transport configuration
    const port = parseInt(process.env.EMAIL_PORT || '587');
    const secure = process.env.EMAIL_SECURE === 'true';
    
    const transportConfig = {
      host: process.env.EMAIL_HOST,
      port: port,
      secure: secure, // true for 465, false for other ports
      requireTLS: !secure, // Use STARTTLS for non-secure ports
      auth: {
        user: process.env.EMAIL_USER.trim(), // Remove spaces for testing
        pass: process.env.EMAIL_PASS.trim(), // Remove spaces for testing
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
      debug: true, // Enable debug output
    };
    
    console.log('🔄 Creating transporter with config:', {
      ...transportConfig,
      auth: {
        user: transportConfig.auth.user,
        pass: '********' // Hide password in logs
      }
    });
    
    // Create transporter
    const transporter = nodemailer.createTransport(transportConfig);
    
    // Verify connection
    console.log('🔄 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Try to send test email
    console.log(`🔄 Sending test email to ${process.env.EMAIL_USER}...`);
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"CodeFusion Test" <${process.env.EMAIL_USER.trim()}>`,
      to: process.env.EMAIL_USER.trim(), // Send to self for testing
      subject: 'CodeFusion OTP Test',
      text: `Hello ${testName},\n\nYour verification code is: ${testOTP}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\nBest regards,\nThe CodeFusion Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568;">CodeFusion Email Verification</h2>
          <p>Hello ${testName},</p>
          <p>Thank you for registering with CodeFusion. Please verify your email address with the following code:</p>
          <div style="background-color: #edf2f7; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="font-size: 32px; margin: 0; color: #4299e1;">${testOTP}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <p>Best regards,<br>The CodeFusion Team</p>
        </div>
      `,
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    
    // Try to create an Ethereal test account as fallback
    console.log('\n🔄 Creating Ethereal test account as alternative...');
    const testAccount = await nodemailer.createTestAccount();
    
    console.log('✅ Ethereal test account created:');
    console.log('- User:', testAccount.user);
    console.log('- Pass:', testAccount.pass);
    
    const etherealTransport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      }
    });
    
    const etherealInfo = await etherealTransport.sendMail({
      from: '"CodeFusion Test" <test@example.com>',
      to: testAccount.user,
      subject: 'CodeFusion OTP Test (Ethereal)',
      text: `Hello ${testName},\n\nYour verification code is: ${testOTP}\n\nThis is a test email sent to Ethereal.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568;">CodeFusion Email Verification</h2>
          <p>Hello ${testName},</p>
          <p>This is a test email sent to Ethereal.</p>
          <div style="background-color: #edf2f7; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="font-size: 32px; margin: 0; color: #4299e1;">${testOTP}</h1>
          </div>
        </div>
      `,
    });
    
    console.log('✅ Ethereal test email sent successfully!');
    console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(etherealInfo));
    console.log('\n💡 If Gmail is not working, you can use Ethereal for testing.');
    console.log('Add this to your .env file:');
    console.log(`
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=${testAccount.user}
EMAIL_PASS=${testAccount.pass}
EMAIL_FROM=noreply@code-fusion.live
    `);
    
    return true;
  } catch (error) {
    console.error('❌ Email delivery test failed:', error);
    
    // Provide troubleshooting guidance
    console.log('\n🔍 Troubleshooting tips:');
    
    if (error.code === 'EAUTH') {
      console.log('- Authentication failed. Check your EMAIL_USER and EMAIL_PASS values.');
      console.log('- For Gmail, make sure you\'re using an App Password, not your regular password.');
      console.log('- Create an App Password: https://myaccount.google.com/apppasswords');
    } else if (error.code === 'ESOCKET') {
      console.log('- Connection issue. Check your EMAIL_HOST and EMAIL_PORT values.');
      console.log('- Make sure your EMAIL_SECURE setting matches your port (true for 465, false for 587).');
      console.log('- Check if your network allows connections to the mail server.');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('- Connection timed out. The mail server might be down or blocked.');
      console.log('- Try increasing timeout values or check your network connection.');
    }
    
    console.log('- For Gmail, make sure "Less secure app access" is enabled or use App Passwords.');
    console.log('- Check if your email provider requires additional configuration.');
    
    return false;
  }
}

// Run the test
testEmailDelivery()
  .then(success => {
    if (success) {
      console.log('✅ Email delivery test completed successfully!');
      process.exit(0);
    } else {
      console.error('❌ Email delivery test failed');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });
