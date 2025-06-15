import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (!admin.apps.length) {
    const serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }
  return admin;
};

// Verify Firebase ID token
export const verifyFirebaseToken = async (idToken) => {
  try {
    const firebase = initializeFirebase();
    const decodedToken = await firebase.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    throw new Error('Invalid Firebase token');
  }
};

// Get user data from Firebase
export const getFirebaseUser = async (uid) => {
  try {
    const firebase = initializeFirebase();
    const userRecord = await firebase.auth().getUser(uid);
    return userRecord;
  } catch (error) {
    console.error('Error getting Firebase user:', error);
    throw new Error('User not found');
  }
};

// Create custom token for user
export const createCustomToken = async (uid, additionalClaims = {}) => {
  try {
    const firebase = initializeFirebase();
    const customToken = await firebase.auth().createCustomToken(uid, additionalClaims);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw new Error('Failed to create custom token');
  }
};

// Delete user from Firebase
export const deleteFirebaseUser = async (uid) => {
  try {
    const firebase = initializeFirebase();
    await firebase.auth().deleteUser(uid);
    return true;
  } catch (error) {
    console.error('Error deleting Firebase user:', error);
    throw new Error('Failed to delete user');
  }
};

export default initializeFirebase; 