// Test SMTP configuration script
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testSMTP() {
  console.log('🧪 Testing SMTP configuration...');
  
  // Log environment variables (without showing full password)
  console.log('📧 Email config:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? `${process.env.EMAIL_PASS.substring(0, 3)}...` : undefined,
    from: process.env.EMAIL_FROM
  });
  
  try {
    // Check if required environment variables are set
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Missing required environment variables for SMTP');
      console.log('Required variables: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM');
      return;
    }
    
    const port = parseInt(process.env.EMAIL_PORT || '587');
    const secure = process.env.EMAIL_SECURE === 'true';
    
    // Create test SMTP transporter
    const transportConfig = {
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
      debug: true, // Enable debug output
    };
    
    console.log('🔄 Creating transporter with config:', {
      ...transportConfig,
      auth: {
        user: transportConfig.auth.user,
        pass: '***' // Hide password in logs
      }
    });
    
    const transporter = nodemailer.createTransport(transportConfig);
    
    // Verify connection configuration
    console.log('🔄 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Send test email
    console.log('🔄 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"CodeFusion Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to self for testing
      subject: 'CodeFusion SMTP Test',
      text: 'If you receive this email, your SMTP configuration is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568;">CodeFusion SMTP Test</h2>
          <p>If you receive this email, your SMTP configuration is working correctly.</p>
          <p>Test details:</p>
          <ul>
            <li>Host: ${process.env.EMAIL_HOST}</li>
            <li>Port: ${port}</li>
            <li>Secure: ${secure}</li>
            <li>User: ${process.env.EMAIL_USER}</li>
            <li>From: ${process.env.EMAIL_FROM || process.env.EMAIL_USER}</li>
            <li>Timestamp: ${new Date().toISOString()}</li>
          </ul>
        </div>
      `,
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('❌ SMTP test failed:', error);
    
    // Provide helpful troubleshooting guidance
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
  }
}

// Run the test
testSMTP();
