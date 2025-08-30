/**
 * CodeFusion Authentication Flow Test Script
 * 
 * This script tests the complete authentication flow:
 * 1. Register a new user
 * 2. Login with the new user
 * 3. Fetch user profile with the JWT token
 * 4. Logout
 * 
 * Usage: 
 *   node test-auth-fixed-v2.js
 */

import fetch from 'node-fetch';
import { randomUUID } from 'crypto';

// Configuration
const API_BASE_URL = 'http://localhost:3000';
const TEST_USER = {
  name: 'Test User',
  email: `test-user-${randomUUID().substring(0, 8)}@example.com`,
  password: 'Password123!'
};

// Utility for color output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Store cookies between requests
let cookies = [];

/**
 * Make a fetch request with cookie handling
 */
async function makeRequest(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`${colors.dim}→ ${method} ${url}${colors.reset}`);
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add cookies from previous responses
  if (cookies.length > 0) {
    options.headers.Cookie = cookies.join('; ');
  }

  // Add body for POST/PUT requests
  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    
    // Save cookies for subsequent requests
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      // Parse cookies and check for expired ones
      const cookieHeaderArray = setCookieHeader.split(',');
      const newCookies = [];
      
      for (const cookieHeader of cookieHeaderArray) {
        const cookieParts = cookieHeader.split(';');
        const cookieNameValue = cookieParts[0].trim();
        const cookieName = cookieNameValue.split('=')[0];
        
        // Check if this cookie has an expires attribute in the past
        const hasExpires = cookieParts.some(part => {
          const trimmed = part.trim().toLowerCase();
          return trimmed.startsWith('expires=') && new Date(trimmed.substring(8)) <= new Date();
        });
        
        // Check if max-age is 0 or negative
        const hasZeroMaxAge = cookieParts.some(part => {
          const trimmed = part.trim().toLowerCase();
          return trimmed.startsWith('max-age=') && parseInt(trimmed.substring(8)) <= 0;
        });
        
        if (hasExpires || hasZeroMaxAge) {
          // Remove this cookie from our stored cookies
          cookies = cookies.filter(c => !c.startsWith(`${cookieName}=`));
          console.log(`${colors.dim}Cookie expired: ${cookieName}${colors.reset}`);
        } else {
          // Add/update the cookie
          newCookies.push(cookieNameValue);
        }
      }
      
      if (newCookies.length > 0) {
        // Update our cookies, replacing any with the same name
        for (const newCookie of newCookies) {
          const cookieName = newCookie.split('=')[0];
          // Remove old version if exists
          cookies = cookies.filter(c => !c.startsWith(`${cookieName}=`));
          // Add new cookie
          cookies.push(newCookie);
        }
        console.log(`${colors.dim}Received cookies: ${newCookies.join(', ')}${colors.reset}`);
      }
    }

    const responseData = await response.json();
    
    return {
      status: response.status,
      data: responseData,
      ok: response.ok,
    };
  } catch (error) {
    console.error(`${colors.red}Error making request to ${url}:${colors.reset}`, error.message);
    return {
      status: 0,
      data: { message: error.message },
      ok: false,
    };
  }
}

/**
 * Run a test and report results
 */
async function runTest(name, testFn) {
  console.log(`\n${colors.bright}${colors.blue}Running test: ${name}${colors.reset}`);
  console.log(`${colors.dim}${'─'.repeat(50)}${colors.reset}`);
  
  try {
    const startTime = performance.now();
    const result = await testFn();
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    
    if (result.success) {
      console.log(`${colors.green}✓ Test Passed${colors.reset} (${duration}ms)`);
      if (result.message) {
        console.log(`  ${result.message}`);
      }
    } else {
      console.log(`${colors.red}✗ Test Failed${colors.reset} (${duration}ms)`);
      console.log(`  ${colors.red}Error: ${result.message}${colors.reset}`);
    }
    
    return result.success;
  } catch (error) {
    console.log(`${colors.red}✗ Test Failed with exception${colors.reset}`);
    console.log(`  ${colors.red}${error.stack}${colors.reset}`);
    return false;
  } finally {
    console.log(`${colors.dim}${'─'.repeat(50)}${colors.reset}`);
  }
}

/**
 * Test registration functionality
 */
async function testRegistration() {
  console.log(`\n${colors.cyan}Testing user registration...${colors.reset}`);
  console.log(`Email: ${TEST_USER.email}`);
  
  // Use the correct API path with the /api/v1 prefix
  const response = await makeRequest('/api/v1/auth/register', 'POST', TEST_USER);
  
  if (!response.ok) {
    return {
      success: false,
      message: `Registration failed: ${response.data.message || 'Unknown error'}`,
    };
  }
  
  console.log(`${colors.green}Registration successful!${colors.reset}`);
  console.log(`Response: ${JSON.stringify(response.data, null, 2)}`);
  
  return {
    success: true,
    message: `User registered with id: ${response.data.user?.id}`,
  };
}

/**
 * Test login functionality
 */
async function testLogin() {
  console.log(`\n${colors.cyan}Testing user login...${colors.reset}`);
  
  const loginData = {
    email: TEST_USER.email,
    password: TEST_USER.password,
  };
  
  // Use the correct API path with the /api/v1 prefix
  const response = await makeRequest('/api/v1/auth/login', 'POST', loginData);
  
  if (!response.ok) {
    return {
      success: false,
      message: `Login failed: ${response.data.message || 'Unknown error'}`,
    };
  }
  
  console.log(`${colors.green}Login successful!${colors.reset}`);
  console.log(`Response: ${JSON.stringify(response.data, null, 2)}`);
  
  return {
    success: true,
    message: `Logged in as: ${response.data.user?.name} (${response.data.user?.email})`,
  };
}

/**
 * Test profile fetch functionality
 */
async function testFetchProfile() {
  console.log(`\n${colors.cyan}Testing profile fetch...${colors.reset}`);
  
  // Use the correct API path with the /api/v1 prefix
  const response = await makeRequest('/api/v1/auth/me', 'GET');
  
  if (!response.ok) {
    return {
      success: false,
      message: `Profile fetch failed: ${response.data.message || 'Unknown error'}`,
    };
  }
  
  console.log(`${colors.green}Profile fetch successful!${colors.reset}`);
  console.log(`Response: ${JSON.stringify(response.data, null, 2)}`);
  
  return {
    success: true,
    message: `Retrieved profile for: ${response.data.user?.name}`,
  };
}

/**
 * Test logout functionality
 */
async function testLogout() {
  console.log(`\n${colors.cyan}Testing logout...${colors.reset}`);
  
  // Use the correct API path with the /api/v1 prefix
  const response = await makeRequest('/api/v1/auth/logout', 'POST');
  
  if (!response.ok) {
    return {
      success: false,
      message: `Logout failed: ${response.data.message || 'Unknown error'}`,
    };
  }
  
  console.log(`${colors.green}Logout successful!${colors.reset}`);
  
  // Verify we're logged out by trying to access the profile
  // Use the correct API path with the /api/v1 prefix
  const profileResponse = await makeRequest('/api/v1/auth/me', 'GET');
  
  if (profileResponse.ok) {
    return {
      success: false,
      message: 'Still able to access protected routes after logout!',
    };
  }
  
  return {
    success: true,
    message: 'Successfully logged out and cannot access protected routes',
  };
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log(`${colors.bright}${colors.magenta}=== CodeFusion Authentication Flow Test ====${colors.reset}`);
  console.log(`${colors.bright}Testing against API: ${API_BASE_URL}${colors.reset}`);

  // Check if server is running
  try {
    const healthCheck = await fetch(`${API_BASE_URL}/api/v1/wake-up`);
    if (!healthCheck.ok) {
      throw new Error(`Server returned status ${healthCheck.status}`);
    }
    console.log(`${colors.green}✓ Server is running${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}✗ Server is not accessible at ${API_BASE_URL}${colors.reset}`);
    console.error(`${colors.red}  Make sure the backend server is running${colors.reset}`);
    process.exit(1);
  }
  
  // Run tests in sequence
  let allPassed = true;
  
  allPassed = await runTest('User Registration', testRegistration) && allPassed;
  allPassed = await runTest('User Login', testLogin) && allPassed;
  allPassed = await runTest('Profile Fetch', testFetchProfile) && allPassed;
  allPassed = await runTest('User Logout', testLogout) && allPassed;
  
  // Report final results
  console.log(`\n${colors.bright}${colors.blue}=== Test Results ===${colors.reset}`);
  if (allPassed) {
    console.log(`${colors.bright}${colors.green}All tests passed successfully!${colors.reset}`);
  } else {
    console.log(`${colors.bright}${colors.red}Some tests failed. See details above.${colors.reset}`);
    process.exit(1);
  }
}

runAllTests().catch(error => {
  console.error(`${colors.red}Unhandled error:${colors.reset}`, error);
  process.exit(1);
});
