// Firebase Configuration Test Script
// Run this in your browser console to test Firebase setup

// Test Firebase configuration
function testFirebaseConfig() {
  console.log('🔥 Testing Firebase Configuration...\n');
  
  const config = {
    apiKey: "AIzaSyBw-7L7RTC7jJAqAfw7stTNHioCf_Vm6zQ",
    authDomain: "codefusion-27ec1.firebaseapp.com",
    projectId: "codefusion-27ec1",
    storageBucket: "codefusion-27ec1.firebasestorage.app",
    messagingSenderId: "306914024430",
    appId: "1:306914024430:web:971ef9fdd582a0532d4cff",
    measurementId: "G-8N4WV3YGVX"
  };

  // Check configuration completeness
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    console.error('❌ Missing Firebase configuration:', missingFields);
    return false;
  }
  
  console.log('✅ All required Firebase config fields are present');
  console.log('📋 Configuration:');
  console.log(`   - API Key: ${config.apiKey.substring(0, 20)}...`);
  console.log(`   - Auth Domain: ${config.authDomain}`);
  console.log(`   - Project ID: ${config.projectId}`);
  console.log(`   - App ID: ${config.appId.substring(0, 20)}...`);
  
  return true;
}

// Test domain authorization
function testDomainAuth() {
  console.log('\n🌍 Testing Domain Authorization...');
  
  const currentDomain = window.location.hostname;
  const currentUrl = window.location.href;
  
  console.log(`Current domain: ${currentDomain}`);
  console.log(`Current URL: ${currentUrl}`);
  
  // Common authorized domains for development
  const commonAuthDomains = [
    'localhost',
    '127.0.0.1',
    'codefusion-27ec1.firebaseapp.com'
  ];
  
  if (commonAuthDomains.includes(currentDomain)) {
    console.log('✅ Domain appears to be commonly authorized');
  } else {
    console.log('⚠️  Domain may need to be added to Firebase authorized domains');
    console.log('   Add this domain to Firebase Console → Authentication → Settings → Authorized domains');
  }
}

// Test network connectivity to Firebase services
async function testFirebaseConnectivity() {
  console.log('\n🔗 Testing Firebase Service Connectivity...');
  
  const services = [
    { name: 'Firebase Auth', url: 'https://codefusion-27ec1.firebaseapp.com' },
    { name: 'Google Accounts', url: 'https://accounts.google.com' },
    { name: 'GitHub OAuth', url: 'https://github.com' }
  ];
  
  for (const service of services) {
    try {
      const response = await fetch(service.url, { 
        method: 'HEAD', 
        mode: 'no-cors' 
      });
      console.log(`✅ ${service.name}: Reachable`);
    } catch (error) {
      console.log(`❌ ${service.name}: Connection failed - ${error.message}`);
    }
  }
}

// Test popup blocker
function testPopupBlocker() {
  console.log('\n🚪 Testing Popup Blocker...');
  
  try {
    const popup = window.open('', '_blank', 'width=1,height=1');
    if (popup) {
      popup.close();
      console.log('✅ Popups are allowed');
    } else {
      console.log('❌ Popups are blocked - this will prevent OAuth signin');
      console.log('   Please allow popups for this site');
    }
  } catch (error) {
    console.log('❌ Popup test failed:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🧪 Running Firebase Diagnostic Tests...\n');
  console.log('=' .repeat(50));
  
  testFirebaseConfig();
  testDomainAuth();
  await testFirebaseConnectivity();
  testPopupBlocker();
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 Diagnostic tests completed!');
  console.log('\nNext steps:');
  console.log('1. Check Firebase Console for authorized domains');
  console.log('2. Verify Google Cloud Console OAuth settings');
  console.log('3. Check GitHub OAuth app settings');
  console.log('4. Enable popups if blocked');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testFirebaseConfig, testDomainAuth, testFirebaseConnectivity, testPopupBlocker, runAllTests };
} else {
  // Browser environment - make functions available globally
  window.testFirebaseConfig = testFirebaseConfig;
  window.testDomainAuth = testDomainAuth;
  window.testFirebaseConnectivity = testFirebaseConnectivity;
  window.testPopupBlocker = testPopupBlocker;
  window.runAllTests = runAllTests;
  
  console.log('🔧 Firebase diagnostic functions loaded!');
  console.log('Run: runAllTests() to test everything');
  console.log('Or run individual tests:');
  console.log('  - testFirebaseConfig()');
  console.log('  - testDomainAuth()');
  console.log('  - testFirebaseConnectivity()');
  console.log('  - testPopupBlocker()');
} 