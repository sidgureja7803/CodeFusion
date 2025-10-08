// Test Email Configuration
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail() {
  console.log('\n🧪 Testing Email Configuration...\n');
  
  // Show config (hide password)
  console.log('📧 Email Config:');
  console.log('  HOST:', process.env.EMAIL_HOST);
  console.log('  PORT:', process.env.EMAIL_PORT);
  console.log('  SECURE:', process.env.EMAIL_SECURE);
  console.log('  USER:', process.env.EMAIL_USER);
  console.log('  PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');
  console.log('  PASS LENGTH:', process.env.EMAIL_PASS?.length || 0, 'characters');
  console.log('  FROM:', process.env.EMAIL_FROM);
  console.log('');

  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ Missing email configuration!');
    console.log('Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in .env');
    process.exit(1);
  }

  try {
    console.log('🔌 Creating transporter...');
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      requireTLS: process.env.EMAIL_SECURE !== 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      debug: true, // Enable debug output
      logger: true, // Enable logger
    });

    console.log('✅ Transporter created');
    console.log('🔐 Verifying connection...\n');
    
    await transporter.verify();
    
    console.log('\n✅ SUCCESS! Email configuration is working!');
    console.log('📧 You can now send emails.\n');
    
    // Try sending a test email
    console.log('📮 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'CodeFusion - Email Test Successful! ✅',
      text: 'Congratulations! Your email configuration is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #4ade80;">✅ Email Test Successful!</h2>
          <p>Congratulations! Your CodeFusion email configuration is working correctly.</p>
          <p>You can now send OTP verification emails to your users.</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 14px;">
            This is a test email from your CodeFusion backend.
          </p>
        </div>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('\n🎉 Check your inbox at:', process.env.EMAIL_USER);
    console.log('');
    
  } catch (error) {
    console.log('\n❌ ERROR:', error.message);
    console.log('');
    
    if (error.message.includes('Invalid login')) {
      console.log('🔧 SOLUTION:');
      console.log('  1. Make sure you are using a Gmail App Password, not your regular password');
      console.log('  2. Enable 2-Factor Authentication: https://myaccount.google.com/security');
      console.log('  3. Generate App Password: https://myaccount.google.com/apppasswords');
      console.log('  4. Copy the 16-character password (remove spaces)');
      console.log('  5. Update EMAIL_PASS in your .env file');
      console.log('  6. Restart this test');
      console.log('');
    } else if (error.message.includes('ECONNECTION') || error.message.includes('timeout')) {
      console.log('🔧 SOLUTION:');
      console.log('  1. Check your internet connection');
      console.log('  2. Disable VPN if you are using one');
      console.log('  3. Check if port 587 is blocked by firewall');
      console.log('  4. Try from a different network');
      console.log('');
    } else {
      console.log('Full error:', error);
      console.log('');
    }
    
    process.exit(1);
  }
}

testEmail();
