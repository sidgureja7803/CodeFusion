import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  connectAuthEmulator
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug Firebase configuration (only in development)
if (import.meta.env.MODE === 'development') {
  console.log('🔥 Firebase Configuration Debug:');
  console.log('Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'MISSING',
    authDomain: firebaseConfig.authDomain || 'MISSING',
    projectId: firebaseConfig.projectId || 'MISSING',
    storageBucket: firebaseConfig.storageBucket || 'MISSING',
    messagingSenderId: firebaseConfig.messagingSenderId || 'MISSING',
    appId: firebaseConfig.appId ? `${firebaseConfig.appId.substring(0, 20)}...` : 'MISSING',
    measurementId: firebaseConfig.measurementId || 'MISSING'
  });
}

// Check for missing configuration
const missingConfig = Object.entries(firebaseConfig).filter(([key, value]) => !value);
if (missingConfig.length > 0) {
  console.error('❌ Missing Firebase configuration:', missingConfig.map(([key]) => key));
  // Don't throw error in production, just log it
  if (import.meta.env.MODE === 'development') {
    console.warn(`⚠️ Missing Firebase configuration: ${missingConfig.map(([key]) => key).join(', ')}`);
  }
}

// Initialize Firebase only if we have the basic config
let app = null;
let auth = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    if (import.meta.env.MODE === 'development') {
      console.log('✅ Firebase initialized successfully');
    }
  } else {
    console.warn('⚠️ Firebase not initialized due to missing configuration');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  console.warn('⚠️ Continuing without Firebase authentication');
}

// Configure providers only if auth is available
let googleProvider = null;
let githubProvider = null;

if (auth) {
  googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('email');
  googleProvider.addScope('profile');
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  githubProvider = new GithubAuthProvider();
  githubProvider.addScope('user:email');
  githubProvider.setCustomParameters({
    allow_signup: 'true'
  });
}

// Sign in with Google
export const signInWithGoogle = async (useRedirect = false) => {
  if (!auth || !googleProvider) {
    throw new Error('Firebase authentication is not properly configured');
  }

  try {
    console.log('🔍 Starting Google sign-in...');
    
    // Try popup first, fall back to redirect if blocked
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      
      console.log('✅ Google sign-in successful:', user.email);
      
      return {
        user,
        idToken,
        provider: 'google.com'
      };
    } catch (popupError) {
      // If popup is blocked, use redirect instead
      if (popupError.code === 'auth/popup-blocked') {
        console.log('⚠️ Popup blocked, using redirect method...');
        await signInWithRedirect(auth, googleProvider);
        // Redirect will happen, no return needed
        return null;
      }
      throw popupError;
    }
  } catch (error) {
    console.error('❌ Google sign-in error:', error);
    
    // More specific error handling
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled. Please try again.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('Domain not authorized. Please contact support.');
    } else if (error.code === 'auth/configuration-not-found') {
      throw new Error('Firebase configuration error. Please contact support.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your internet connection and try again.');
    } else if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Google sign-in is not enabled. Please contact support.');
    } else if (error.code === 'auth/invalid-api-key') {
      throw new Error('Invalid Firebase configuration. Please contact support.');
    }
    
    throw error;
  }
};

// Sign in with GitHub
export const signInWithGithub = async (useRedirect = false) => {
  if (!auth || !githubProvider) {
    throw new Error('Firebase authentication is not properly configured');
  }

  try {
    console.log('🔍 Starting GitHub sign-in...');
    
    // Try popup first, fall back to redirect if blocked
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      
      console.log('✅ GitHub sign-in successful:', user.email);
      
      return {
        user,
        idToken,
        provider: 'github.com'
      };
    } catch (popupError) {
      // If popup is blocked, use redirect instead
      if (popupError.code === 'auth/popup-blocked') {
        console.log('⚠️ Popup blocked, using redirect method...');
        await signInWithRedirect(auth, githubProvider);
        // Redirect will happen, no return needed
        return null;
      }
      throw popupError;
    }
  } catch (error) {
    console.error('❌ GitHub sign-in error:', error);
    
    // More specific error handling
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled. Please try again.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('Domain not authorized. Please contact support.');
    } else if (error.code === 'auth/configuration-not-found') {
      throw new Error('Firebase configuration error. Please contact support.');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with this email using a different sign-in method.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your internet connection and try again.');
    } else if (error.code === 'auth/operation-not-allowed') {
      throw new Error('GitHub sign-in is not enabled. Please contact support.');
    } else if (error.code === 'auth/invalid-api-key') {
      throw new Error('Invalid Firebase configuration. Please contact support.');
    }
    
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  if (!auth) {
    console.warn('⚠️ Firebase auth not available for sign-out');
    return;
  }

  try {
    await firebaseSignOut(auth);
    console.log('✅ Successfully signed out');
  } catch (error) {
    console.error('❌ Sign-out error:', error);
    throw error;
  }
};

// Get current user ID token
export const getCurrentUserToken = async () => {
  if (!auth) {
    console.warn('⚠️ Firebase auth not available for token');
    return null;
  }

  try {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  } catch (error) {
    console.error('Error getting user token:', error);
    throw error;
  }
};

// Handle redirect result (call this on app initialization)
export const handleRedirectResult = async () => {
  if (!auth) {
    console.warn('⚠️ Firebase auth not available for redirect result');
    return null;
  }

  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      const idToken = await user.getIdToken();
      
      console.log('✅ Redirect sign-in successful:', user.email);
      
      // Determine provider from result
      const providerId = result.providerId || 'google.com';
      
      return {
        user,
        idToken,
        provider: providerId
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Redirect result error:', error);
    throw error;
  }
};

// Export auth safely
export { auth };
export default app; 