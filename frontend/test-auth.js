// Test script for authentication flows
import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1";

// Create axios instance with configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 15000
});

// Helper function to log test results
const logResult = (test, success, message, data = null) => {
  console.log(`${success ? '✅' : '❌'} ${test}: ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
};

// Test registration with a new user
const testRegistration = async () => {
  console.log('\n🧪 TESTING REGISTRATION:');
  
  try {
    // Test Case 1: Missing required fields
    console.log('\nTest Case 1: Missing required fields');
    try {
      await axiosInstance.post('/auth/register', { email: 'test@example.com' });
    } catch (error) {
      logResult('Missing password', true, 'Server correctly rejected registration with missing fields', error.response?.data);
    }

    // Test Case 2: Registration with existing email
    console.log('\nTest Case 2: Registration with existing email');
    try {
      await axiosInstance.post('/auth/register', { 
        name: 'Test User',
        email: 'existing@example.com', 
        password: 'Password123!'
      });
    } catch (error) {
      logResult('Existing email', true, 'Server correctly rejected registration with existing email', error.response?.data);
    }

    // Test Case 3: Successful registration
    console.log('\nTest Case 3: Successful registration');
    const randomEmail = `test${Date.now()}@example.com`;
    try {
      const response = await axiosInstance.post('/auth/register', {
        name: 'New Test User',
        email: randomEmail,
        password: 'Password123!'
      });
      logResult('Successful registration', true, `Successfully registered new user with email: ${randomEmail}`, response.data);
      return response.data.user; // Return the created user for login tests
    } catch (error) {
      logResult('Successful registration', false, 'Registration failed', error.response?.data);
      return null;
    }
  } catch (error) {
    console.error('Test execution error:', error);
  }
};

// Test login with various scenarios
const testLogin = async (createdUser) => {
  console.log('\n🧪 TESTING LOGIN:');
  
  try {
    // Test Case 1: Missing credentials
    console.log('\nTest Case 1: Missing credentials');
    try {
      await axiosInstance.post('/auth/login', { email: 'test@example.com' });
    } catch (error) {
      logResult('Missing password', true, 'Server correctly rejected login with missing credentials', error.response?.data);
    }

    // Test Case 2: Non-existent user
    console.log('\nTest Case 2: Non-existent user');
    try {
      await axiosInstance.post('/auth/login', {
        email: `nonexistent${Date.now()}@example.com`,
        password: 'Password123!'
      });
    } catch (error) {
      logResult('Non-existent user', true, 'Server correctly rejected login for non-existent user', error.response?.data);
    }

    // Test Case 3: Wrong password
    console.log('\nTest Case 3: Wrong password');
    try {
      await axiosInstance.post('/auth/login', {
        email: createdUser ? createdUser.email : 'test@example.com',
        password: 'WrongPassword123!'
      });
    } catch (error) {
      logResult('Wrong password', true, 'Server correctly rejected login with wrong password', error.response?.data);
    }

    // Test Case 4: Successful login
    console.log('\nTest Case 4: Successful login');
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: createdUser ? createdUser.email : 'test@example.com',
        password: 'Password123!'
      });
      logResult('Successful login', true, 'Successfully logged in', response.data);
    } catch (error) {
      logResult('Successful login', false, 'Login failed', error.response?.data);
    }
  } catch (error) {
    console.error('Test execution error:', error);
  }
};

// Main function to run all tests
const runTests = async () => {
  console.log('🚀 Starting authentication flow tests...');
  
  // Run registration tests
  const createdUser = await testRegistration();
  
  // Run login tests with the newly created user
  if (createdUser) {
    await testLogin(createdUser);
  } else {
    console.log('⚠️ Skipping login tests with created user as registration failed');
    await testLogin(null);
  }
  
  console.log('\n✅ Tests completed!');
};

// Execute tests
runTests().catch(err => console.error('Test runner error:', err));
