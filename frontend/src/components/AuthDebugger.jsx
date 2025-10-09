import React, { useState, useEffect } from 'react';
import { runAuthDiagnostics, fixAuthIssues } from '../utils/authDebug';
import { axiosInstance } from '../libs/axios';

const AuthDebugger = () => {
  const [diagnostics, setDiagnostics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    try {
      const results = await runAuthDiagnostics();
      setDiagnostics(results);
    } catch (error) {
      console.error('Failed to run diagnostics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFix = async () => {
    setFixing(true);
    try {
      await fixAuthIssues();
      // Run diagnostics again after fixing
      await runDiagnostics();
    } catch (error) {
      console.error('Failed to fix issues:', error);
    } finally {
      setFixing(false);
    }
  };

  const handleTestLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('Test login response:', response.data);
      alert('Test login successful! Check console for details.');
    } catch (error) {
      console.error('Test login failed:', error.response?.data || error.message);
      alert(`Test login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    // Run diagnostics on mount
    runDiagnostics();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 w-80">
      <div 
        className="p-3 bg-blue-500 text-white font-medium rounded-t-lg flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-1.243-1.243A6 6 0 1118 8zm-6-4a1 1 0 00-1 1v.5a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1z" clipRule="evenodd" />
          </svg>
          Auth Debugger
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
              onClick={runDiagnostics}
              disabled={loading}
            >
              {loading ? 'Running...' : 'Run Diagnostics'}
            </button>
            <button 
              className="px-3 py-1 bg-amber-500 text-white rounded text-sm hover:bg-amber-600 transition-colors"
              onClick={handleFix}
              disabled={fixing}
            >
              {fixing ? 'Fixing...' : 'Fix Issues'}
            </button>
            <button 
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
              onClick={handleTestLogin}
            >
              Test Login
            </button>
          </div>
          
          {diagnostics ? (
            <div className="text-xs overflow-auto max-h-60 bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
              <div className="font-semibold mb-1">Authentication Status:</div>
              <div className={`mb-2 ${diagnostics.authStatus.authenticated ? 'text-green-600' : 'text-red-600'}`}>
                {diagnostics.authStatus.authenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
              </div>
              
              <div className="font-semibold mb-1">CORS Status:</div>
              <div className={`mb-2 ${diagnostics.corsStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                {diagnostics.corsStatus.success ? '✅ CORS OK' : '❌ CORS Issues'}
              </div>
              
              <div className="font-semibold mb-1">Details:</div>
              <pre className="whitespace-pre-wrap break-all">
                {JSON.stringify(diagnostics, null, 2)}
              </pre>
            </div>
          ) : loading ? (
            <div className="text-center py-4 text-slate-500">Running diagnostics...</div>
          ) : (
            <div className="text-center py-4 text-slate-500">No diagnostic data available</div>
          )}
          
          <div className="mt-4 text-xs text-slate-500">
            Last updated: {diagnostics?.timestamp ? new Date(diagnostics.timestamp).toLocaleTimeString() : 'Never'}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthDebugger;
