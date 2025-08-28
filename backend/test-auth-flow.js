// Test script for authentication flow
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const API_URL = process.env.API_URL || 'http://localhost:3000';
let authToken = '';
let testUserId = '';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

async function logStep(message) {
  console.log(`${colors.blue}🔍 ${message}${colors.reset}`);
}

async function logSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

async function logError(message, error) {
  console.error(`${colors.red}❌ ${message}${colors.reset}`);
  if (error) console.error(`   ${colors.red}${error}${colors.reset}`);
}

async function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

async function logInfo(message) {
  console.log(`${colors.cyan}ℹ️  ${message}${colors.reset}`);
}

async function registerUser() {
  const testEmail = `test_${Date.now()}@example.com`;
  const password = 'Test@123456';

  try {
    logStep('Testing user registration...');
    
    const response = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: testEmail,
        password: password,
      }),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (response.ok) {
      logSuccess(`User registered successfully with email: ${testEmail}`);
      return { email: testEmail, password, userId: data.user?.id };
    } else {
      logError(`Registration failed: ${data.message || 'Unknown error'}`);
      return null;
    }
  } catch (error) {
    logError('Registration error:', error.message);
    return null;
  }
}

async function loginUser(email, password) {
  try {
    logStep(`Attempting login with email: ${email}...`);
    
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      logSuccess('Login successful!');
      // Get token from cookies instead
      return 'cookie-auth-used';
    } else {
      logError(`Login failed: ${data.message || 'Unknown error'}`);
      return null;
    }
  } catch (error) {
    logError('Login error:', error.message);
    return null;
  }
}

async function getUserProfile(token) {
  try {
    logStep('Fetching user profile...');
    
    // Use credentials: 'include' to send cookies with the request
    const response = await fetch(`${API_URL}/api/v1/auth/me`, {
      credentials: 'include'
    });

    const data = await response.json();
    
    if (response.ok) {
      logSuccess('User profile fetched successfully');
      console.log(`${colors.magenta}Profile Data:${colors.reset}`, JSON.stringify(data, null, 2));
      return data;
    } else {
      logError(`Failed to fetch profile: ${data.message || 'Unknown error'}`);
      return null;
    }
  } catch (error) {
    logError('Profile fetch error:', error.message);
    return null;
  }
}

async function checkDatabaseSchema() {
  try {
    logStep('Checking database schema for User model...');
    
    // Check if we can get a user from the database
    const user = await prisma.user.findFirst();
    
    // Check for specific fields
    if (user) {
      logSuccess('Successfully queried User table from the database');
      logInfo('Fields present in User model:');
      
      const fieldsList = Object.keys(user).filter(key => !key.startsWith('_'));
      console.log(`${colors.cyan}${fieldsList.join(', ')}${colors.reset}`);
      
      // Verify specific fields we're concerned about
      if ('emailVerified' in user) {
        logSuccess('emailVerified field is present in User model');
      } else {
        logWarning('emailVerified field is NOT present in User model');
      }
      
      if ('isActive' in user) {
        logInfo('isActive field is present in User model');
      } else {
        logInfo('isActive field is NOT present in User model (this is expected with our fix)');
      }
      
      return true;
    } else {
      logWarning('Could not find any users in the database to inspect schema');
      return false;
    }
  } catch (error) {
    logError('Database schema check error:', error.message);
    return false;
  }
}

async function cleanupTestUser(userId) {
  if (!userId) return;
  
  try {
    logStep('Cleaning up test user...');
    await prisma.user.delete({ where: { id: userId } });
    logSuccess('Test user deleted successfully');
  } catch (error) {
    logError('Failed to clean up test user:', error.message);
  }
}

async function runTests() {
  console.log(`${colors.magenta}========================================${colors.reset}`);
  console.log(`${colors.magenta}   AUTHENTICATION FLOW TEST SCRIPT      ${colors.reset}`);
  console.log(`${colors.magenta}========================================${colors.reset}`);
  
  try {
    // Check database schema first
    await checkDatabaseSchema();
    
    // Test registration
    const userInfo = await registerUser();
    
    if (!userInfo) {
      logError('Cannot continue tests without registration');
      await prisma.$disconnect();
      return;
    }
    
    // Test login
    authToken = await loginUser(userInfo.email, userInfo.password);
    
    if (!authToken) {
      logError('Cannot continue tests without successful login');
      await cleanupTestUser(userInfo.userId);
      await prisma.$disconnect();
      return;
    }
    
    // Test profile fetch
    await getUserProfile(authToken);
    
    // Cleanup
    await cleanupTestUser(userInfo.userId);
    
    console.log(`${colors.green}========================================${colors.reset}`);
    console.log(`${colors.green}   TEST SUITE COMPLETED SUCCESSFULLY    ${colors.reset}`);
    console.log(`${colors.green}========================================${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}========================================${colors.reset}`);
    console.error(`${colors.red}   TEST SUITE FAILED                    ${colors.reset}`);
    console.error(`${colors.red}========================================${colors.reset}`);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test suite
runTests();
