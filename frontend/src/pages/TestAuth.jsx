import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../libs/axios';
import { useAuthStore } from '../store/useAuthStore';

const TestAuth = () => {
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [userInfo, setUserInfo] = useState(null);
  const [testResponse, setTestResponse] = useState('');
  const [errors, setErrors] = useState([]);
  const { authUser } = useAuthStore();

  // Function to test wake-up endpoint
  const testWakeUp = async () => {
    try {
      const response = await axiosInstance.get('/wake-up');
      setTestResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Wake-up test failed:', error);
      setErrors(prev => [...prev, `Wake-up failed: ${error.message}`]);
    }
  };

  // Function to register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/register', registerData);
      setUserInfo(response.data.user);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors(prev => [...prev, `Registration failed: ${error.message}`]);
    }
  };

  // Function to login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', loginData);
      setUserInfo(response.data.user);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
      setErrors(prev => [...prev, `Login failed: ${error.message}`]);
    }
  };

  // Function to get user info
  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      setUserInfo(response.data.user);
      console.log('User info fetched:', response.data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      setErrors(prev => [...prev, `Fetch user info failed: ${error.message}`]);
    }
  };

  // Function to logout
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setUserInfo(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      setErrors(prev => [...prev, `Logout failed: ${error.message}`]);
    }
  };

  // Clear errors
  const clearErrors = () => {
    setErrors([]);
  };

  useEffect(() => {
    // Check if user is already authenticated from store
    if (authUser) {
      setUserInfo(authUser);
    }
    // Test wake-up endpoint on component mount
    testWakeUp();
  }, [authUser]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Authentication Test Page</h1>
      
      {/* Connection Test */}
      <div className="mb-8 p-4 border border-gray-600 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">API Connection Test</h2>
        <button 
          onClick={testWakeUp}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Wake-up Endpoint
        </button>
        {testResponse && (
          <div className="mt-4">
            <h3 className="font-medium">Response:</h3>
            <pre className="bg-gray-900 p-3 rounded overflow-x-auto text-green-400 mt-2">{testResponse}</pre>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registration Form */}
        <div className="p-4 border border-gray-600 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Register
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className="p-4 border border-gray-600 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-8 p-4 border border-gray-600 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">User Session</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={fetchUserInfo}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Check Auth Status
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={!userInfo}
          >
            Logout
          </button>
        </div>
        {userInfo ? (
          <div>
            <h3 className="font-medium">Logged In User:</h3>
            <pre className="bg-gray-900 p-3 rounded overflow-x-auto text-green-400 mt-2">
              {JSON.stringify(userInfo, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-gray-400">Not logged in</p>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-8 p-4 border border-red-600 rounded-lg bg-red-900 bg-opacity-20">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-red-400">Errors</h2>
            <button 
              onClick={clearErrors}
              className="text-sm px-2 py-1 bg-red-700 rounded hover:bg-red-800"
            >
              Clear
            </button>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-300">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Debug Info */}
      <div className="mt-8 p-4 border border-gray-600 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Debug Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">API URL:</h3>
            <p className="bg-gray-900 p-2 rounded mt-1 text-sm break-all">{axiosInstance.defaults.baseURL}</p>
          </div>
          <div>
            <h3 className="font-medium">withCredentials:</h3>
            <p className="bg-gray-900 p-2 rounded mt-1 text-sm">{axiosInstance.defaults.withCredentials ? "true" : "false"}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-medium">Browser Cookies:</h3>
            <p className="bg-gray-900 p-2 rounded mt-1 text-sm break-all">{document.cookie || "No cookies found"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAuth;
