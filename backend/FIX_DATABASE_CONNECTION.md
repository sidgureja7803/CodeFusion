# Fix Database Connection Error

## The Problem

The error `Can't reach database server at aws-1-ap-south-1.pooler.supabase.com:5432` means your `DIRECT_URL` is incorrect.

## The Solution

You need to update your `.env` file with the correct Supabase connection strings.

### Step 1: Get Your Supabase Connection Strings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Project Settings** (gear icon at bottom left)
4. Click on **Database** in the left sidebar
5. Scroll down to **Connection string** section

You'll see several connection strings. You need TWO of them:

#### For `DATABASE_URL` (Connection Pooling):
- Select **"URI"** tab
- Select **"Session mode"** 
- Copy the connection string
- It will look like: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres`
- **Important**: Add `?pgbouncer=true` at the end

#### For `DIRECT_URL` (Direct Connection):
- Select **"URI"** tab
- Select **"Transaction mode"** or scroll to find the direct connection
- Copy the connection string
- It will look like: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres`
- **Important**: This should use port **5432** but with a different host or parameter

### Step 2: Update Your `.env` File

Open `backend/.env` and update these two lines:

```env
# For connection pooling (used by app at runtime)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# For direct connection (used by Prisma migrations)
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
```

**Replace**:
- `[PROJECT-REF]` with your actual project reference (e.g., `abcdefghijklm`)
- `[YOUR-PASSWORD]` with your actual database password

### Alternative: Get Connection String from Supabase Dashboard

If the above doesn't work, try this method:

1. In Supabase Dashboard → Project Settings → Database
2. Look for **Connection Info** section
3. You'll see:
   - **Host**: `aws-1-ap-south-1.pooler.supabase.com`
   - **Database name**: `postgres`
   - **Port**: `5432` (for direct) or `6543` (for pooler)
   - **User**: `postgres.[your-project-ref]`
   - **Password**: (click to reveal)

4. Build your connection strings manually:

```env
# Pooled connection (port 6543)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (port 5432) - Use IPv4 address or different endpoint
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@[DIRECT-HOST]:5432/postgres"
```

### Step 3: Try Alternative Direct URL

If port 5432 still doesn't work, Supabase might require a different host for direct connections. Try:

```env
# Option 1: Use the database host instead of pooler
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Option 2: Use the same pooler but without pgbouncer param
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"

# Option 3: If your Supabase project is new, it might use a different region
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?sslmode=require"
```

### Step 4: Test the Connection

After updating `.env`, test if Prisma can connect:

```bash
cd backend
npx prisma db pull
```

If this works, you'll see your current database schema. Then try the migration:

```bash
npx prisma migrate dev --name add_email_verified
```

## Quick Fix: Run Migration Manually in Supabase

If the above still doesn't work, you can run the migration SQL directly in Supabase:

1. Go to Supabase Dashboard → SQL Editor
2. Click **New Query**
3. Paste this SQL:

```sql
-- Add emailVerified column
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- Update existing users to be verified (optional)
UPDATE "User" 
SET "emailVerified" = true 
WHERE "emailVerified" IS NULL OR "emailVerified" = false;

-- Verify the column was added
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'User' AND column_name = 'emailVerified';
```

4. Click **Run** (or press `Ctrl+Enter`)
5. You should see "Success. No rows returned"
6. Then run `npx prisma generate` in your backend to update the Prisma client

## Common Issues and Solutions

### Issue 1: SSL/TLS Error
Add `?sslmode=require` to the end of your connection strings:
```env
DIRECT_URL="postgresql://...?sslmode=require"
```

### Issue 2: Timeout Error
Your IP might be blocked. Go to Supabase Dashboard → Project Settings → Database → Connection pooling and add your IP to the allowed list.

### Issue 3: Wrong Password
Double-check your database password. You can reset it in:
Supabase Dashboard → Project Settings → Database → Database password → Reset

### Issue 4: Network/Firewall Issues
Try connecting from a different network or disable VPN if you're using one.

## Verify Your Configuration

After updating your `.env`, verify the connection strings are correct:

```bash
# This should show your current database schema
npx prisma db pull

# This should list your database tables
npx prisma studio
```

## Final Check

Your `.env` should look similar to this:

```env
DATABASE_URL="postgresql://postgres.abcdefghijklm:your-password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.abcdefghijklm:your-password@db.abcdefghijklm.supabase.co:5432/postgres"
```

**Important Notes**:
- Both URLs should have the SAME password
- PROJECT-REF is the same in both (the random string)
- DATABASE_URL uses port `6543` (pooler)
- DIRECT_URL should use a direct connection endpoint

If you're still having issues, please share:
1. Your Supabase project region (from dashboard)
2. Whether you're using Supabase's free tier or pro
3. Any firewall/VPN you might be using

