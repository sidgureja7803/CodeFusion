# Backend Setup Guide

## Database Configuration (Neon)

This project uses **Neon** as the PostgreSQL database provider.

### Environment Variables Required:

```env
# Neon Database URLs
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:password@host/dbname?sslmode=require"
```

- **DATABASE_URL**: Connection pooling URL from Neon (recommended for serverless and production)
- **DIRECT_URL**: Direct connection URL for running migrations

### Getting Your Neon URLs:

1. Go to your [Neon Dashboard](https://console.neon.tech/)
2. Select your project
3. Navigate to the "Connection Details" section
4. Copy both:
   - **Pooled connection** → `DATABASE_URL`
   - **Direct connection** → `DIRECT_URL`

### Running Migrations:

```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

### Testing Neon Connection:

You can test your Neon connection using the provided test script:

```bash
node src/libs/neon-test.js
```

Then visit `http://localhost:3000` to see your PostgreSQL version, confirming the connection works.

## AI Configuration (Gemini API)

This project uses **Google's Gemini API** for AI assistance features.

### Environment Variables Required:

```env
# Gemini API Configuration
GEMINI_API_KEY="your-gemini-api-key-here"
GEMINI_MODEL="gemini-1.5-flash"  # Optional, defaults to gemini-1.5-flash
```

### Getting Your Gemini API Key:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

### Supported Models:

- `gemini-1.5-flash` (default) - Fast and efficient
- `gemini-1.5-pro` - More capable, higher quality responses
- `gemini-pro` - Legacy model

## Installation

```bash
cd backend
npm install
```

## Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Code Execution Configuration (RapidAPI)

This project uses **RapidAPI** for Judge0 code execution.

### Environment Variables Required:

```env
# RapidAPI for Judge0
RAPIDAPI_KEY="your-rapidapi-key-here"
RAPIDAPI_HOST="judge0-ce.p.rapidapi.com"
```

### Getting Your RapidAPI Keys:

1. Go to [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce/)
2. Sign up or log in to RapidAPI
3. Subscribe to the Judge0 CE API (free tier available)
4. Copy your API key from the dashboard
5. Add both keys to your `.env` file

## Additional Configuration

Make sure your `.env` file includes all required variables:

```env
# Neon Database
DATABASE_URL="your-neon-pooled-connection-string"
DIRECT_URL="your-neon-direct-connection-string"

# Gemini AI
GEMINI_API_KEY="your-gemini-api-key"
GEMINI_MODEL="gemini-1.5-flash"

# RapidAPI (Judge0)
RAPIDAPI_KEY="your-rapidapi-key"
RAPIDAPI_HOST="judge0-ce.p.rapidapi.com"

# Server
JWT_SECRET="your-jwt-secret"
PORT=5000
NODE_ENV="development"
```

