# Database Migration Guide

## Adding `emailVerified` Field to User Table

This guide will help you migrate the database schema to add the `emailVerified` field to the User table in Supabase.

### Prerequisites

- Access to your Supabase dashboard
- Or Prisma CLI installed (`npm install -g prisma`)

### Option 1: Using Prisma (Recommended)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Run Prisma migration:**
   ```bash
   npx prisma migrate dev --name add_email_verified
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Deploy to production (Supabase):**
   ```bash
   npx prisma migrate deploy
   ```

### Option 2: Manual SQL Migration (Supabase Dashboard)

1. **Open your Supabase project dashboard**
2. **Navigate to** `SQL Editor` → `New Query`
3. **Paste the following SQL:**

```sql
-- Add emailVerified column to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- Update existing users to have emailVerified = true (optional, for backward compatibility)
-- Comment out the next line if you want all existing users to verify their email
UPDATE "User" SET "emailVerified" = true WHERE "emailVerified" IS NULL OR "emailVerified" = false;

-- Create index on emailVerified for faster queries (optional but recommended)
CREATE INDEX IF NOT EXISTS "User_emailVerified_idx" ON "User"("emailVerified");
```

4. **Click "Run" to execute the migration**

### Option 3: Using the Migration File

A migration file has been created at: `backend/prisma/migrations/add_email_verified/migration.sql`

You can run this directly on your Supabase database.

### Verification

After running the migration, verify it worked:

**Using Prisma:**
```bash
npx prisma studio
```

**Or query directly in Supabase:**
```sql
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'User' AND column_name = 'emailVerified';
```

### Rollback (if needed)

If you need to rollback the migration:

```sql
ALTER TABLE "User" DROP COLUMN IF EXISTS "emailVerified";
```

## Environment Variables

Make sure you have the following environment variables set in your `.env` file:

### Backend (`backend/.env`)

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:port/database"

# Email (for OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM="CodeFusion <noreply@codefusion.dev>"

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Firebase (for OAuth)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
```

### Setting up Email SMTP (Gmail Example)

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. At the bottom, click "App passwords"
4. Select "Mail" and your device
5. Copy the generated password and use it as `EMAIL_PASS`

### Testing the OTP Feature

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Register a new user** through the signup page
3. **Check your email** for the OTP code
4. **Enter the OTP** on the verification page
5. **You should be redirected to login** after successful verification

### Notes

- The OTP expires in 10 minutes
- OTP codes are 6 digits
- Existing users will have `emailVerified = true` by default (for backward compatibility)
- New users must verify their email before they can log in
- If email sending fails during registration, the user can still request a new OTP

## Troubleshooting

### Issue: Migration fails with "column already exists"
**Solution:** The column might already exist. Check with:
```sql
SELECT * FROM information_schema.columns WHERE table_name = 'User';
```

### Issue: OTP emails not sending
**Solution:** 
- Check your EMAIL environment variables
- Ensure 2FA and app passwords are set up for Gmail
- Check backend logs for error messages
- Try using Ethereal (test email service) for development

### Issue: Session not persisting on refresh
**Solution:**
- Check browser cookies are enabled
- Verify CORS settings in backend
- Ensure `NODE_ENV` is not set to `production` for local development
- Check that cookies are being set with correct `sameSite` and `secure` flags

## Support

If you encounter any issues, please check:
1. Backend logs (`backend/` console output)
2. Browser console for frontend errors
3. Supabase logs in the dashboard
4. Network tab to see API requests/responses

