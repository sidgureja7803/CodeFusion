# CodeFusion Testing Guide

This guide provides step-by-step instructions for testing the complete user flow in CodeFusion, with focus on the Judge0 integration and OTP verification.

## Prerequisites

1. Ensure you have all environment variables set up as described in `ENVIRONMENT_VARIABLES.md`.
2. Make sure your PostgreSQL database is running.
3. Judge0 instance should be accessible at the configured URL (default: http://54.161.231.143:2358).

## Running the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies (if not already installed):
   ```
   npm install
   ```

3. Apply the database migration to add the `emailVerified` field:
   ```
   npx prisma migrate dev --name add_email_verified
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

## Running the Frontend

1. In a new terminal, navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. The frontend should be accessible at http://localhost:5173 (or the port shown in the terminal).

## Testing the Complete User Flow

### 1. User Registration and OTP Verification

1. Navigate to http://localhost:5173/signup
2. Fill in the registration form with:
   - Full Name
   - Email (use a valid email if your SMTP is configured, otherwise check the terminal for the Ethereal preview URL)
   - Password (minimum 6 characters)
   - Confirm Password
3. Click "Sign Up"
4. You should be redirected to the OTP verification screen
5. Check your email or the console log for the OTP verification code
   - If using Ethereal for testing, look for a log message with "Preview URL" in the backend console
6. Enter the 6-digit OTP in the verification form
7. If successful, you should be redirected to the login page with a success message

### 2. User Login

1. Navigate to http://localhost:5173/login
2. Enter the email and password you just registered with
3. Click "Log In"
4. You should be redirected to the dashboard

### 3. Testing Judge0 Code Execution

1. From the dashboard, navigate to a coding problem
2. Write some code or use the provided template
3. Click "Run" or "Submit"
4. Verify that:
   - The code is submitted to the Judge0 API
   - Results are displayed correctly (stdout, stderr, compilation errors)
   - For multiple test cases, all results are shown

### 4. Testing Error Scenarios

#### Invalid OTP
1. During registration, intentionally enter an incorrect OTP
2. Verify that an error message is displayed
3. Click "Resend Code" to get a new OTP
4. Enter the new OTP correctly

#### Unverified Login
1. Create a new user but don't complete OTP verification
2. Try to log in with those credentials
3. Verify you're prompted to verify your email
4. Complete the verification process
5. Try logging in again

#### Judge0 API Issues
1. Intentionally set an incorrect Judge0 API URL in your environment variables
2. Try to run code
3. Verify that appropriate error messages are displayed

## Troubleshooting

### OTP Email Issues
- Check backend logs for SMTP errors
- If using Gmail, ensure you're using an App Password if 2FA is enabled
- For testing, the Ethereal test account should always work

### Judge0 API Issues
- Verify the Judge0 service is running at the specified URL
- Check that CORS is properly configured using the `update-judge0-cors.sh` script
- Inspect network requests in the browser developer tools

### Database Issues
- Ensure your PostgreSQL database is running
- Verify the DATABASE_URL in your .env file is correct
- Run `npx prisma db push` to ensure schema is in sync
