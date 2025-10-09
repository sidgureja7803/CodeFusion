// Fix email configuration script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

async function fixEmailConfig() {
  console.log('🔧 Fixing email configuration...');
  
  try {
    const envPath = path.join(__dirname, '.env');
    
    // Read current .env file
    const envContent = fs.readFileSync(envPath, 'utf8');
    let updatedContent = envContent;
    
    // Fix EMAIL_USER by removing spaces
    if (process.env.EMAIL_USER && process.env.EMAIL_USER !== process.env.EMAIL_USER.trim()) {
      console.log(`📝 Fixing EMAIL_USER: "${process.env.EMAIL_USER}" -> "${process.env.EMAIL_USER.trim()}"`);
      updatedContent = updatedContent.replace(
        /^EMAIL_USER=(.*)$/m,
        `EMAIL_USER=${process.env.EMAIL_USER.trim()}`
      );
    }
    
    // Fix EMAIL_PASS by removing spaces
    if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== process.env.EMAIL_PASS.trim()) {
      console.log('📝 Fixing EMAIL_PASS: Removing spaces');
      updatedContent = updatedContent.replace(
        /^EMAIL_PASS=(.*)$/m,
        `EMAIL_PASS=${process.env.EMAIL_PASS.trim()}`
      );
    }
    
    // Fix EMAIL_SECURE to match port
    const port = parseInt(process.env.EMAIL_PORT || '587');
    const correctSecure = port === 465 ? 'true' : 'false';
    
    if (process.env.EMAIL_SECURE !== correctSecure) {
      console.log(`📝 Fixing EMAIL_SECURE: "${process.env.EMAIL_SECURE}" -> "${correctSecure}" (for port ${port})`);
      updatedContent = updatedContent.replace(
        /^EMAIL_SECURE=(.*)$/m,
        `EMAIL_SECURE=${correctSecure}`
      );
    }
    
    // Write updated content back to .env file
    if (updatedContent !== envContent) {
      fs.writeFileSync(envPath, updatedContent);
      console.log('✅ Email configuration fixed successfully!');
    } else {
      console.log('✅ No issues found with email configuration.');
    }
    
    // Create Ethereal account as fallback
    console.log('\n🔄 Creating Ethereal test account as fallback...');
    const testAccount = await nodemailer.createTestAccount();
    
    console.log('✅ Ethereal test account created:');
    console.log('- User:', testAccount.user);
    console.log('- Pass:', testAccount.pass);
    
    // Create ethereal.env file
    const etherealEnvPath = path.join(__dirname, 'ethereal.env');
    const etherealEnvContent = `# Ethereal Email Configuration (for testing)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=${testAccount.user}
EMAIL_PASS=${testAccount.pass}
EMAIL_FROM=noreply@code-fusion.live
`;
    
    fs.writeFileSync(etherealEnvPath, etherealEnvContent);
    console.log('✅ Ethereal configuration saved to ethereal.env');
    console.log('💡 To use Ethereal for testing, copy the contents of ethereal.env to .env');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to fix email configuration:', error);
    return false;
  }
}

// Run the fix
fixEmailConfig()
  .then(success => {
    if (success) {
      console.log('✅ Email configuration fix completed!');
      process.exit(0);
    } else {
      console.error('❌ Email configuration fix failed');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('❌ Fix execution failed:', error);
    process.exit(1);
  });
