import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut
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

// Debug Firebase configuration
console.log('🔥 Firebase Configuration Debug:');
console.log('✅ API Key:', firebaseConfig.apiKey ? 'Set' : '❌ Missing');
console.log('✅ Auth Domain:', firebaseConfig.authDomain ? 'Set' : '❌ Missing');
console.log('✅ Project ID:', firebaseConfig.projectId ? 'Set' : '❌ Missing');
console.log('✅ App ID:', firebaseConfig.appId ? 'Set' : '❌ Missing');
console.log('🌍 Current Domain:', window.location.hostname);

// Validate configuration
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error('❌ Missing Firebase configuration fields:', missingFields);
  throw new Error(`Firebase configuration incomplete. Missing: ${missingFields.join(', ')}`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Configure providers
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email');

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    console.log('🔍 Starting Google sign-in...');
    console.log('🔧 Auth domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
    console.log('🔧 Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
    
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();
    
    console.log('✅ Google sign-in successful:', user.email);
    console.log('🎫 ID Token received');
    
    return {
      user,
      idToken,
      provider: 'google.com'
    };
  } catch (error) {
    console.error('❌ Google sign-in error:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error message:', error.message);
    
    // More specific error handling
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup blocked! Please allow popups for this site and try again.');
    } else if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled. Please try again.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('Domain not authorized. Please contact support.');
    } else if (error.code === 'auth/configuration-not-found') {
      throw new Error('Firebase configuration error. Please contact support.');
    }
    
    throw error;
  }
};

// Sign in with GitHub
export const signInWithGithub = async () => {
  try {
    console.log('🔍 Starting GitHub sign-in...');
    console.log('🔧 Auth domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
    console.log('🔧 Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
    
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    const idToken = await user.getIdToken();
    
    console.log('✅ GitHub sign-in successful:', user.email);
    console.log('🎫 ID Token received');
    
    return {
      user,
      idToken,
      provider: 'github.com'
    };
  } catch (error) {
    console.error('❌ GitHub sign-in error:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error message:', error.message);
    
    // More specific error handling
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup blocked! Please allow popups for this site and try again.');
    } else if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled. Please try again.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('Domain not authorized. Please contact support.');
    } else if (error.code === 'auth/configuration-not-found') {
      throw new Error('Firebase configuration error. Please contact support.');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with this email using a different sign-in method.');
    }
    
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
};

// Get current user ID token
export const getCurrentUserToken = async () => {
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

export default app; 