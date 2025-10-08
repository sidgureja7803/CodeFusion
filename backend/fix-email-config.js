// Fix SMTP email configuration script
// This script removes spaces from EMAIL_USER and EMAIL_PASS in .env file

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Path to .env file
const envPath = path.join(__dirname, '.env');

console.log('📧 Fixing email configuration in .env file...');

// Read .env file
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Fix EMAIL_USER by removing spaces
  let fixedContent = envContent.replace(/^EMAIL_USER=\s+(.+)$/m, 'EMAIL_USER=$1');
  
  // Fix EMAIL_PASS by removing spaces
  fixedContent = fixedContent.replace(/^EMAIL_PASS=\s+(.+)$/m, 'EMAIL_PASS=$1');
  
  // Write fixed content back to .env file
  fs.writeFileSync(envPath, fixedContent);
  
  console.log('✅ Fixed email configuration in .env file');
  console.log('📧 Updated EMAIL_USER and EMAIL_PASS (removed spaces)');
  
  // Load and display fixed values (without showing full password)
  dotenv.config();
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  console.log('📧 Current EMAIL_USER:', emailUser);
  console.log('📧 EMAIL_PASS length:', emailPass?.length || 0);
  
  console.log('\n🚀 Now restart the backend server to apply changes!');
} catch (error) {
  console.error('❌ Error fixing email configuration:', error);
}
