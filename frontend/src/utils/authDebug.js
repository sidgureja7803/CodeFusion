// Authentication Debug Utility
// This script helps diagnose authentication issues

import { axiosInstance } from '../libs/axios';

// Check authentication status
export const checkAuthStatus = async () => {
  console.log('🔍 Checking authentication status...');
  
  try {
    // First check if cookies are enabled
    const cookiesEnabled = navigator.cookieEnabled;
    console.log('🍪 Cookies enabled in browser:', cookiesEnabled);
    
    if (!cookiesEnabled) {
      console.error('❌ Cookies are disabled in the browser. Authentication will not work properly.');
      return {
        success: false,
        authenticated: false,
        message: 'Cookies are disabled in your browser. Please enable cookies for authentication to work.',
        details: { cookiesEnabled }
      };
    }
    
    // Check for JWT in cookies
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
    console.log('🍪 JWT cookie present:', !!jwtCookie);
    
    // Check if auth token exists in localStorage (fallback)
    const authToken = localStorage.getItem('authToken');
    console.log('🔑 Auth token in localStorage:', !!authToken);
    
    // Check API connection
    console.log('🔌 Testing API connection...');
    try {
      const wakeupResponse = await axiosInstance.get('/wake-up');
      console.log('✅ API connection successful:', wakeupResponse.data);
    } catch (wakeupError) {
      console.error('❌ API connection failed:', wakeupError.message);
      return {
        success: false,
        authenticated: false,
        message: 'Cannot connect to API server. Please check your internet connection.',
        details: { error: wakeupError.message }
      };
    }
    
    // Try to get user data from /auth/me endpoint
    try {
      console.log('👤 Checking user authentication...');
      const response = await axiosInstance.get('/auth/me');
      console.log('✅ User authenticated:', response.data);
      
      return {
        success: true,
        authenticated: true,
        user: response.data.user,
        message: 'User is authenticated'
      };
    } catch (authError) {
      console.log('❌ User not authenticated:', authError.response?.data || authError.message);
      
      return {
        success: false,
        authenticated: false,
        message: authError.response?.data?.message || 'Authentication failed',
        details: {
          status: authError.response?.status,
          data: authError.response?.data,
          error: authError.message
        }
      };
    }
  } catch (error) {
    console.error('💥 Error checking authentication:', error);
    return {
      success: false,
      authenticated: false,
      message: 'Error checking authentication status',
      details: { error: error.message }
    };
  }
};

// Debug CORS issues
export const debugCORS = async () => {
  console.log('🔍 Debugging CORS issues...');
  
  try {
    // Get current origin
    const origin = window.location.origin;
    console.log('🌐 Current origin:', origin);
    
    // Check if API URL is correctly configured
    const apiUrl = axiosInstance.defaults.baseURL;
    console.log('🚀 API URL:', apiUrl);
    
    // Make a simple OPTIONS request to check CORS
    const response = await fetch(apiUrl + '/wake-up', {
      method: 'OPTIONS',
      credentials: 'include',
      headers: {
        'Origin': origin,
        'Access-Control-Request-Method': 'GET'
      }
    });
    
    console.log('✅ CORS preflight response:', {
      status: response.status,
      ok: response.ok,
      headers: {
        'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
        'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials'),
        'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods')
      }
    });
    
    return {
      success: true,
      cors: {
        status: response.status,
        ok: response.ok,
        allowOrigin: response.headers.get('Access-Control-Allow-Origin'),
        allowCredentials: response.headers.get('Access-Control-Allow-Credentials'),
        allowMethods: response.headers.get('Access-Control-Allow-Methods')
      }
    };
  } catch (error) {
    console.error('❌ CORS check failed:', error);
    return {
      success: false,
      message: 'CORS check failed',
      details: { error: error.message }
    };
  }
};

// Fix common authentication issues
export const fixAuthIssues = () => {
  console.log('🔧 Attempting to fix authentication issues...');
  
  try {
    // Clear any potentially corrupted tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    
    // Clear JWT cookie by setting it to expire in the past
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    console.log('✅ Auth data cleared. Please try logging in again.');
    return {
      success: true,
      message: 'Auth data cleared. Please try logging in again.'
    };
  } catch (error) {
    console.error('❌ Failed to fix auth issues:', error);
    return {
      success: false,
      message: 'Failed to fix authentication issues',
      details: { error: error.message }
    };
  }
};

// Export a function to run all checks
export const runAuthDiagnostics = async () => {
  console.log('🔍 Running authentication diagnostics...');
  
  const authStatus = await checkAuthStatus();
  const corsStatus = await debugCORS();
  
  return {
    authStatus,
    corsStatus,
    timestamp: new Date().toISOString()
  };
};
