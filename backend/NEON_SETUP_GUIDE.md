# 🗄️ Neon Database Setup Guide

## Understanding Neon Connection Strings

**Important**: Neon doesn't use "API keys" - it uses **connection strings** (URLs).

In your Neon dashboard, you'll see **connection strings**, not API keys!

---

## 📝 What You Need from Neon

You need **TWO** connection strings from Neon:

### 1. **DATABASE_URL** (Pooled Connection)
- Used for: Regular database queries in your application
- Why: Optimized for serverless/connection pooling
- Faster and more efficient for production

### 2. **DIRECT_URL** (Direct Connection)
- Used for: Running Prisma migrations
- Why: Migrations need a direct database connection
- Required for `prisma migrate` commands

---

## 🔍 How to Get Your Connection Strings

### Step 1: Go to Neon Dashboard
1. Visit [https://console.neon.tech/](https://console.neon.tech/)
2. Sign in to your account
3. Select your project

### Step 2: Find Connection Details
1. In your project, look for **"Connection Details"** or **"Connection string"**
2. You'll see a dropdown or section with connection options

### Step 3: Copy BOTH Connection Strings

#### For DATABASE_URL (Pooled):
```
Look for: "Pooled connection" or connection string with "?pgbouncer=true"
Example: postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
```

#### For DIRECT_URL (Direct):
```
Look for: "Direct connection" or connection string WITHOUT "pgbouncer"
Example: postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**The difference**: 
- Pooled has `?pgbouncer=true` at the end
- Direct does NOT have `?pgbouncer=true`

---

## 🖼️ Visual Guide

In Neon Dashboard you'll see something like:

```
┌─────────────────────────────────────────────┐
│  Connection Details                          │
├─────────────────────────────────────────────┤
│                                              │
│  Connection Type:  [Pooled ▼]               │
│                                              │
│  Connection String:                          │
│  postgresql://user:pass@host/db?pgbouncer=true │
│                                              │
│  ℹ️  Switch to "Direct" to get direct URL   │
└─────────────────────────────────────────────┘
```

**Switch between "Pooled" and "Direct" to get both URLs!**

---

## ⚙️ How to Set Up Your .env File

Create or update your `backend/.env` file:

```env
# Neon Database Connection Strings
# Copy from Neon Dashboard -> Connection Details

# 1. DATABASE_URL - Pooled connection (with pgbouncer=true)
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"

# 2. DIRECT_URL - Direct connection (WITHOUT pgbouncer)
DIRECT_URL="postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

---

## 🚀 Quick Setup Steps

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Set Environment Variables
Copy both connection strings from Neon into your `.env` file

### Step 3: Run Migrations
```bash
npx prisma migrate deploy
npx prisma generate
```

### Step 4: Test Connection
```bash
node src/libs/neon-test.js
```
Then visit `http://localhost:3000` - you should see your PostgreSQL version!

---

## 🔍 Troubleshooting

### "Cannot connect to database"
✅ **Check**: Did you copy the ENTIRE connection string including the password?
✅ **Check**: Did you include both URLs (DATABASE_URL and DIRECT_URL)?
✅ **Check**: Is there a space or newline breaking the URL?

### "Error in Prisma migrate"
✅ **Check**: Is your DIRECT_URL set correctly (without pgbouncer)?
✅ **Check**: Did you run `npx prisma generate` after migrations?

### "Connection pooling error"
✅ **Check**: Is your DATABASE_URL using the pooled version (with pgbouncer=true)?

---

## 📊 What's the Difference?

| Feature | DATABASE_URL (Pooled) | DIRECT_URL (Direct) |
|---------|----------------------|---------------------|
| **Use Case** | Application queries | Migrations |
| **Speed** | Faster (connection pooling) | Slower (direct) |
| **Contains** | `?pgbouncer=true` | No pgbouncer |
| **Best For** | Production, serverless | Database schema changes |

---

## ✅ Example Configuration

Here's what a complete setup looks like:

```env
# ============================================
# NEON DATABASE CONFIGURATION
# ============================================

# Get these from: https://console.neon.tech/
# Project -> Connection Details

# Pooled Connection (for queries)
DATABASE_URL="postgresql://myuser:mypass123@ep-cool-mountain-123456.us-east-2.aws.neon.tech/mydb?sslmode=require&pgbouncer=true"

# Direct Connection (for migrations)
DIRECT_URL="postgresql://myuser:mypass123@ep-cool-mountain-123456.us-east-2.aws.neon.tech/mydb?sslmode=require"

# ============================================
# OTHER CONFIGS
# ============================================

GEMINI_API_KEY="your-gemini-key"
RAPIDAPI_KEY="your-rapidapi-key"
RAPIDAPI_HOST="judge0-ce.p.rapidapi.com"
```

---

## 🎯 Key Points to Remember

1. **Not API Keys**: Neon uses connection strings, not API keys
2. **Two URLs**: You need both pooled and direct versions
3. **Same Credentials**: Both URLs use the same username/password
4. **Different Parameters**: The difference is in the `?pgbouncer=true` parameter
5. **Copy Carefully**: Make sure to copy the entire string without breaks

---

## 🆘 Still Stuck?

Check these:
- ✅ Neon project is active (not paused)
- ✅ Your IP is allowed (Neon allows all by default)
- ✅ Password doesn't contain special characters that need URL encoding
- ✅ You're using the correct region endpoint

---

## 📚 Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma with Neon](https://www.prisma.io/docs/guides/database/neon)
- [Neon Connection Pooling](https://neon.tech/docs/connect/connection-pooling)

---

**Made with ❤️ for CodeFusion**

