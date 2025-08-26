# CodeFusion Environment Variables Documentation

This document describes all the environment variables required for CodeFusion to function properly.

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```sh
# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173

# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/codefusion?schema=public
DIRECT_URL=postgresql://postgres:postgres@localhost:5432/codefusion?schema=public

# Authentication
JWT_SECRET=your_secure_jwt_secret_key
COOKIE_SECRET=your_secure_cookie_signing_key

# Judge0 API Configuration
JUDGE0_API_URL=http://54.161.231.143:2358

# Email Configuration for OTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=CodeFusion <your-email@gmail.com>

# Optional Services
AIMLAPI_GPT5=your_AIMLAPI_GPT5_key
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key

# Firebase Configuration (if used)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Firebase_Private_Key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_firebase_client_email@project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_firebase_client_id
```

## Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following variables:

```sh
# API URLs
VITE_API_URL=http://localhost:3000/api/v1
VITE_JUDGE0_API_URL=http://54.161.231.143:2358

# Firebase Configuration (if used)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

## Required Variables for OTP Verification

The following variables are specifically needed for the OTP email verification feature:

### Backend
- `EMAIL_HOST`: SMTP server (e.g., smtp.gmail.com for Gmail)
- `EMAIL_PORT`: SMTP port (typically 587 for TLS)
- `EMAIL_SECURE`: Set to `true` for SSL connections, `false` for TLS
- `EMAIL_USER`: Your email account username
- `EMAIL_PASS`: Your email account password or app password (for Gmail, you'll need to generate an app password)
- `EMAIL_FROM`: The sender email address displayed to recipients

### Setting up Gmail SMTP
If using Gmail:
1. Enable 2-Factor Authentication in your Google account
2. Generate an App Password: Account → Security → App passwords
3. Use that password as `EMAIL_PASS`

## Required Variables for Judge0 Integration

For Judge0 API integration:

### Backend
- `JUDGE0_API_URL`: URL of the Judge0 API (default: http://54.161.231.143:2358 for the AWS instance)

### Frontend
- `VITE_JUDGE0_API_URL`: Same as backend Judge0 URL (default: http://54.161.231.143:2358)

## CORS Configuration for Judge0

The Judge0 server needs to be configured to accept requests from your frontend domain. Use the provided `update-judge0-cors.sh` script:

```sh
./update-judge0-cors.sh your-frontend-url
```

Replace `your-frontend-url` with your actual frontend URL (e.g., http://localhost:5173).
