// Simple authentication test script
import fetch from 'node-fetch';

// Configuration
const API_URL = 'http://localhost:3000'; // Change this if running on a different port
const TEST_USER = {
  name: 'Test User',
  email: `test_${Date.now()}@example.com`, // Generate unique email
  password: 'TestPassword123!'
};

// Console styling
const s = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

// Helper functions
async function log(message) {
  console.log(`${s.cyan}${message}${s.reset}`);
}

async function success(message) {
  console.log(`${s.green}✓ ${message}${s.reset}`);
}

async function error(message) {
  console.log(`${s.red}✗ ${message}${s.reset}`);
}

async function heading(message) {
  console.log(`\n${s.bold}${s.yellow}${message}${s.reset}`);
}

// Test functions
async function testRegistration() {
  heading('Testing User Registration');
  log(`Attempting to register with email: ${TEST_USER.email}`);

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER),
      credentials: 'include'
    });
    
    const data = await response.json();
    console.log('Registration response:', data);
    
    if (response.ok && data.success) {
      success(`Registration successful for ${TEST_USER.email}`);
      return true;
    } else {
      error(`Registration failed: ${data.message || 'Unknown error'}`);
      return false;
    }
  } catch (err) {
    error(`Error during registration: ${err.message}`);
    return false;
  }
}

async function testLogin() {
  heading('Testing User Login');
  log(`Attempting to login with email: ${TEST_USER.email}`);

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_USER.email,
        password: TEST_USER.password
      }),
      credentials: 'include'
    });
    
    const data = await response.json();
    console.log('Login response:', data);
    
    if (response.ok && data.success) {
      success('Login successful!');
      return true;
    } else {
      error(`Login failed: ${data.message || 'Unknown error'}`);
      return false;
    }
  } catch (err) {
    error(`Error during login: ${err.message}`);
    return false;
  }
}

async function testUserProfile() {
  heading('Testing User Profile');
  log('Fetching user profile after login');

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/me`, {
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      success('Profile retrieved successfully');
      console.log('User profile:', data.user);
      return true;
    } else {
      error(`Profile retrieval failed: ${data.message || 'Unknown error'}`);
      return false;
    }
  } catch (err) {
    error(`Error fetching profile: ${err.message}`);
    return false;
  }
}

// Run the tests
async function runTests() {
  console.log(`${s.bold}${s.cyan}===== AUTHENTICATION FLOW TEST =====${s.reset}`);
  
  const registerSuccess = await testRegistration();
  if (!registerSuccess) {
    console.log(`${s.yellow}Skipping login tests since registration failed${s.reset}`);
    return;
  }
  
  // Wait a moment before login
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const loginSuccess = await testLogin();
  if (!loginSuccess) {
    console.log(`${s.yellow}Skipping profile test since login failed${s.reset}`);
    return;
  }
  
  await testUserProfile();
  
  console.log(`\n${s.bold}${s.green}===== TEST COMPLETE =====${s.reset}`);
}

// Start tests
runTests().catch(err => {
  console.error(`${s.red}Fatal error in test suite: ${err.message}${s.reset}`);
});
