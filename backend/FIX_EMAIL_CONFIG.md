# 🔧 Fix Your Email Configuration

## ❌ Current Issues in Your `.env`:

1. **`EMAIL_SECURE=true`** - Wrong! Should be `false` for port 587
2. **App Password has spaces** - Should remove all spaces

## ✅ Correct Configuration:

Open `backend/.env` and change these lines:

```env
# Change from:
EMAIL_SECURE=true
EMAIL_PASS= kddd eluw szik vaemsend 

# To:
EMAIL_SECURE=false
EMAIL_PASS=kdddleuwzikvaemsend
```

## 📝 Complete Corrected Config:

Your `backend/.env` should have:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=sidddhantgureja39@gmail.com
EMAIL_PASS=kdddleuwzikvaemsend
EMAIL_FROM=noreply@code-fusion.live
```

**Important Changes**:
- ✅ `EMAIL_SECURE=false` (not true!)
- ✅ Removed ALL spaces from password
- ✅ Password is now one continuous string

## 🚀 After Making Changes:

1. **Save the `.env` file**
2. **Restart your backend:**
   ```bash
   # Stop the backend (Ctrl+C if running)
   # Then start again:
   cd backend
   npm run dev
   ```

3. **Test registration:**
   - Go to http://localhost:5173/sign-up
   - Register with a new email
   - **Check backend console** - you should see:
     ```
     📧 Email config: { host: 'smtp.gmail.com', port: 587, secure: false, ... }
     ✅ Verification email sent to ...
     ```
   - **Check your email** for the OTP!

## 🔍 Why This Fixes It:

### Issue 1: `EMAIL_SECURE=true` on Port 587
- Port **587** uses **STARTTLS** (requires `secure: false`)
- Port **465** uses **SSL** (requires `secure: true`)
- Your config was trying to use SSL on port 587 → SSL version mismatch error

### Issue 2: Spaces in Password
- Gmail App Passwords are 16 characters: `xxxx xxxx xxxx xxxx`
- Spaces are only for readability
- SMTP requires them as one string: `xxxxxxxxxxxxxxxx`
- Spaces in password → authentication fails

## ✅ Quick Fix Script:

Run this in your terminal to fix automatically:

```bash
cd /Users/siddhantgureja/Desktop/CodeFusion/backend

# Backup current .env
cp .env .env.backup

# Fix EMAIL_SECURE
sed -i '' 's/EMAIL_SECURE=true/EMAIL_SECURE=false/' .env

# Fix EMAIL_PASS (remove spaces)
sed -i '' 's/EMAIL_PASS= kddd eluw szik vaemsend/EMAIL_PASS=kdddleuwzikvaemsend/' .env

echo "✅ Fixed! Check your .env file"
cat .env | grep EMAIL
```

Or just manually edit the file - it's safer! 😊

## 📧 Email Should Work Now!

After fixing, emails should send successfully. No more SSL errors!

