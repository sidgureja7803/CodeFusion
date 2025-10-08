# Email SMTP Setup Guide for CodeFusion

## The SSL/TLS Error Fix

The error you saw:
```
SSL routines:tls_validate_record_header:wrong version number
```

This happens when the SMTP configuration uses the wrong SSL/TLS settings. I've fixed this in the code.

## Gmail SMTP Setup (Recommended for Production)

### Step 1: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** if not already enabled
3. Wait a few minutes for it to fully activate

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords
2. Click **"Select app"** → Choose **"Mail"**
3. Click **"Select device"** → Choose **"Other (Custom name)"**
4. Type: **"CodeFusion Backend"**
5. Click **"Generate"**
6. Copy the **16-character password** (format: `xxxx xxxx xxxx xxxx`)

### Step 3: Update Your `.env` File

Add these to `backend/.env`:

```env
# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
EMAIL_FROM="CodeFusion <noreply@codefusion.dev>"
```

**Important**:
- ✅ Use `EMAIL_PORT=587` (not 465)
- ✅ Use `EMAIL_SECURE=false` (uses STARTTLS automatically)
- ✅ Use the **App Password**, not your regular Gmail password
- ✅ Remove spaces from App Password: `xxxxxxxxxxxxxxxx`

### Step 4: Restart Backend
```bash
cd backend
npm run dev
```

### Step 5: Test
1. Try registering a new user
2. Check backend console - you should see:
   ```
   📧 Email config: { host: 'smtp.gmail.com', port: 587, secure: false, ... }
   ✅ Verification email sent to test@example.com
   ```
3. Check your email inbox for the OTP

---

## Alternative: Using SendGrid (Recommended for Production)

SendGrid is more reliable for production apps.

### Step 1: Create SendGrid Account
1. Go to https://sendgrid.com
2. Sign up for free account (100 emails/day free)
3. Verify your email address

### Step 2: Create API Key
1. Go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Name it: **"CodeFusion Production"**
4. Select **"Full Access"** or **"Mail Send"** permissions
5. Copy the API key (starts with `SG.`)

### Step 3: Update `.env`
```env
# Email Configuration (SendGrid)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=SG.your-actual-api-key-here
EMAIL_FROM="CodeFusion <noreply@codefusion.dev>"
```

**Important**:
- ✅ `EMAIL_USER` must be exactly `apikey`
- ✅ `EMAIL_PASS` is your SendGrid API key

### Step 4: Verify Sender Email (Required for SendGrid)
1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Enter your email (e.g., `noreply@codefusion.dev` or your Gmail)
4. Check your email and click verification link
5. Update `EMAIL_FROM` in `.env` to match verified email

---

## Alternative: Using Mailgun

### Step 1: Create Mailgun Account
1. Go to https://www.mailgun.com
2. Sign up for free (5,000 emails/month free for 3 months)

### Step 2: Get SMTP Credentials
1. Go to **Sending** → **Domain Settings** → **SMTP Credentials**
2. Note your SMTP hostname (e.g., `smtp.mailgun.org`)
3. Create a new SMTP user or use existing
4. Copy the password

### Step 3: Update `.env`
```env
# Email Configuration (Mailgun)
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=postmaster@your-mailgun-domain.com
EMAIL_PASS=your-mailgun-smtp-password
EMAIL_FROM="CodeFusion <noreply@your-mailgun-domain.com>"
```

---

## Testing Email Configuration

### Method 1: Register a Test User
```bash
# Start backend
cd backend
npm run dev

# In another terminal, test with curl:
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-real-email@gmail.com",
    "password": "Test123!@#"
  }'
```

### Method 2: Check Backend Logs
When you register, you should see:
```
📧 Email config: { host: 'smtp.gmail.com', port: 587, secure: false, ... }
Making email connection...
✅ Verification email sent to your-email@gmail.com: <message-id>
```

### Method 3: Use Ethereal (Development Only)
If you don't configure EMAIL variables, the app automatically uses Ethereal (fake SMTP):
```
📧 Preview URL: https://ethereal.email/message/xxxxx
```
Click that URL to see the email without actually sending it.

---

## Common Issues & Solutions

### Issue 1: "Invalid login: 535-5.7.8 Username and Password not accepted"
**Solution**: 
- Make sure you're using an **App Password**, not your regular Gmail password
- Ensure 2FA is enabled in Google Account
- Wait 5-10 minutes after creating App Password

### Issue 2: "Connection timeout"
**Solution**:
- Check your firewall/antivirus isn't blocking port 587
- Try using your phone's hotspot to rule out network issues
- Increase timeout in code (already done in the fix)

### Issue 3: "SSL routines: wrong version number"
**Solution**: ✅ **FIXED!**
- Updated code to use `requireTLS: true` for port 587
- Uses STARTTLS instead of direct SSL
- Should work now with `EMAIL_SECURE=false`

### Issue 4: "Error: self-signed certificate"
**Solution**: ✅ **FIXED!**
- Added `rejectUnauthorized: false` in TLS config
- This allows self-signed certificates (development)
- For production, use a proper SSL certificate

### Issue 5: Emails go to Spam
**Solutions**:
- Use a verified domain for `EMAIL_FROM`
- Set up SPF and DKIM records (SendGrid/Mailgun handle this)
- Don't use free email addresses (like @gmail.com) in `EMAIL_FROM` for production
- Consider using a service like SendGrid or Mailgun for better deliverability

---

## Environment Variables Reference

### Required Variables:
```env
EMAIL_HOST=smtp.gmail.com          # SMTP server hostname
EMAIL_PORT=587                     # Port (587 for STARTTLS, 465 for SSL)
EMAIL_SECURE=false                 # false for port 587, true for port 465
EMAIL_USER=your-email@gmail.com    # Your email or SMTP username
EMAIL_PASS=your-app-password       # App password or API key
EMAIL_FROM="CodeFusion <noreply@codefusion.dev>"  # From address
```

### Port Guide:
- **Port 587**: Use `EMAIL_SECURE=false` (STARTTLS) ✅ **Recommended**
- **Port 465**: Use `EMAIL_SECURE=true` (Direct SSL)
- **Port 25**: Usually blocked by ISPs, don't use

---

## Production Recommendations

### For Production, Use:
1. **SendGrid** or **Mailgun** (most reliable)
2. **AWS SES** (if using AWS)
3. **Postmark** (excellent deliverability)

### Don't Use in Production:
- ❌ Personal Gmail accounts (rate limited to ~100/day)
- ❌ Ethereal (fake email service, development only)
- ❌ Port 25 (usually blocked)

### Best Practices:
- ✅ Use a dedicated email service (SendGrid, Mailgun, etc.)
- ✅ Set up proper SPF, DKIM, and DMARC records
- ✅ Use a custom domain for sender email
- ✅ Monitor email delivery and bounce rates
- ✅ Keep API keys in environment variables, never commit them
- ✅ Use different email services for dev/staging/production

---

## Quick Start: Get Email Working Now

**Fastest way to test (5 minutes)**:

1. **Option A: Use Ethereal (No Config Required)**
   ```env
   # Remove or comment out EMAIL_ variables in .env
   # App will automatically use Ethereal
   ```
   - Check backend console for preview URL
   - Click URL to see email

2. **Option B: Use Gmail App Password**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   EMAIL_FROM="CodeFusion <your-email@gmail.com>"
   ```
   - Get App Password from: https://myaccount.google.com/apppasswords
   - Remove spaces from the password
   - Restart backend

3. **Test**:
   ```bash
   cd backend
   npm run dev
   # Register a new user and check your email
   ```

---

## Troubleshooting Checklist

- [ ] Confirmed EMAIL_HOST is correct (smtp.gmail.com for Gmail)
- [ ] Using port 587 with EMAIL_SECURE=false
- [ ] Using App Password, not regular password
- [ ] App Password has no spaces
- [ ] 2FA is enabled on Google Account
- [ ] Waited 5 minutes after creating App Password
- [ ] Backend was restarted after changing .env
- [ ] Checked backend console for email config logs
- [ ] Tried from different network (disable VPN)
- [ ] Firewall/antivirus not blocking port 587

If still not working, share:
1. Your EMAIL_HOST value
2. Backend console output when sending email
3. Whether you're using App Password or API key

