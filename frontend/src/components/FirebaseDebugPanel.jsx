import React, { useState } from 'react';
import { signInWithGoogle, signInWithGithub } from '../libs/firebase';
import { useFirebaseAuthStore } from '../store/useFirebaseAuthStore';

const FirebaseDebugPanel = () => {
  const [debugInfo, setDebugInfo] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { isLoading } = useFirebaseAuthStore();

  const addDebugInfo = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugInfo(prev => `${prev}\n[${timestamp}] ${message}`);
  };

  const testGoogleAuth = async () => {
    try {
      addDebugInfo('🔍 Testing Google Authentication...');
      const result = await signInWithGoogle();
      addDebugInfo(`✅ Google Auth Success: ${result.user.email}`);
      addDebugInfo(`🎫 ID Token: ${result.idToken.substring(0, 50)}...`);
    } catch (error) {
      addDebugInfo(`❌ Google Auth Error: ${error.message}`);
      addDebugInfo(`❌ Error Code: ${error.code}`);
    }
  };

  const testGithubAuth = async () => {
    try {
      addDebugInfo('🔍 Testing GitHub Authentication...');
      const result = await signInWithGithub();
      addDebugInfo(`✅ GitHub Auth Success: ${result.user.email}`);
      addDebugInfo(`🎫 ID Token: ${result.idToken.substring(0, 50)}...`);
    } catch (error) {
      addDebugInfo(`❌ GitHub Auth Error: ${error.message}`);
      addDebugInfo(`❌ Error Code: ${error.code}`);
    }
  };

  const testBackendConnection = async () => {
    try {
      addDebugInfo('🔍 Testing Backend Connection...');
      const response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/auth/me`, {
        credentials: 'include'
      });
      addDebugInfo(`🌐 Backend Response: ${response.status} ${response.statusText}`);
      if (response.ok) {
        const data = await response.json();
        addDebugInfo(`✅ Backend connection successful`);
      } else {
        addDebugInfo(`❌ Backend connection failed`);
      }
    } catch (error) {
      addDebugInfo(`❌ Backend Error: ${error.message}`);
    }
  };

  const clearDebugInfo = () => {
    setDebugInfo('');
  };

  const checkFirebaseConfig = () => {
    addDebugInfo('🔍 Checking Firebase Configuration...');
    addDebugInfo(`API Key: ${import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'}`);
    addDebugInfo(`Auth Domain: ${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'}`);
    addDebugInfo(`Project ID: ${import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}`);
    addDebugInfo(`App ID: ${import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'}`);
    addDebugInfo(`Current Domain: ${window.location.hostname}`);
    addDebugInfo(`Current URL: ${window.location.href}`);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors z-50"
      >
        🔧 Firebase Debug
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">🔥 Firebase Debug Panel</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          {/* Control Panel */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Test Controls</h3>
            
            <button
              onClick={checkFirebaseConfig}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              🔍 Check Firebase Config
            </button>
            
            <button
              onClick={testGoogleAuth}
              disabled={isLoading}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              🔍 Test Google Auth
            </button>
            
            <button
              onClick={testGithubAuth}
              disabled={isLoading}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              🔍 Test GitHub Auth
            </button>
            
            <button
              onClick={testBackendConnection}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              🔍 Test Backend Connection
            </button>
            
            <button
              onClick={clearDebugInfo}
              className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              🧹 Clear Debug Info
            </button>

            <div className="mt-4 p-3 bg-gray-100 rounded">
              <h4 className="font-semibold text-sm mb-2">Environment Info:</h4>
              <div className="text-xs space-y-1">
                <div>Mode: {import.meta.env.MODE}</div>
                <div>Dev: {import.meta.env.DEV ? 'Yes' : 'No'}</div>
                <div>Prod: {import.meta.env.PROD ? 'Yes' : 'No'}</div>
                <div>Backend URL: {import.meta.env.VITE_DEV_BACKEND_URL}</div>
              </div>
            </div>
          </div>
          
          {/* Debug Output */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Debug Output</h3>
            <textarea
              value={debugInfo}
              readOnly
              className="w-full h-96 p-3 border rounded bg-gray-50 font-mono text-sm"
              placeholder="Debug information will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseDebugPanel; 