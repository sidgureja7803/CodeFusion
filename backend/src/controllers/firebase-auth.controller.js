import { verifyFirebaseToken, getFirebaseUser } from '../libs/firebase.lib.js';
import { db } from '../libs/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Firebase Google/GitHub login
export const firebaseLogin = async (req, res) => {
  try {
    const { idToken, provider } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Firebase ID token is required',
      });
    }

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Get additional user info from Firebase
    const firebaseUser = await getFirebaseUser(uid);
    
    // Extract provider info
    const providerData = firebaseUser.providerData[0];
    const providerId = provider || providerData?.providerId || 'google.com';

    // Check if user exists in our database
    let user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      // Create new user
      user = await db.user.create({
        data: {
          email: email,
          name: name || firebaseUser.displayName || 'User',
          image: picture || firebaseUser.photoURL,
          password: 'firebase_auth', // Placeholder for Firebase users
          role: 'USER',
          firebaseUid: uid,
          authProvider: providerId,
        },
      });
    } else {
      // Update existing user with Firebase info if not already set
      if (!user.firebaseUid) {
        user = await db.user.update({
          where: { id: user.id },
          data: {
            firebaseUid: uid,
            authProvider: providerId,
            image: picture || firebaseUser.photoURL || user.image,
            lastLogin: new Date(),
          },
        });
      } else {
        // Just update last login
        user = await db.user.update({
          where: { id: user.id },
          data: {
            lastLogin: new Date(),
          },
        });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        firebaseUid: uid 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        authProvider: user.authProvider,
        streakCount: user.streakCount,
        maxStreakCount: user.maxStreakCount,
      },
    });

  } catch (error) {
    console.error('Firebase login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: error.message,
    });
  }
};

// Link Firebase account to existing user
export const linkFirebaseAccount = async (req, res) => {
  try {
    const { idToken, provider } = req.body;
    const userId = req.loggedInUser.id;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Firebase ID token is required',
      });
    }

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(idToken);
    const { uid, email } = decodedToken;

    // Check if Firebase account is already linked to another user
    const existingUser = await db.user.findFirst({
      where: {
        firebaseUid: uid,
        id: { not: userId },
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'This account is already linked to another user',
      });
    }

    // Update user with Firebase info
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        firebaseUid: uid,
        authProvider: provider || 'google.com',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Account linked successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        role: updatedUser.role,
        authProvider: updatedUser.authProvider,
      },
    });

  } catch (error) {
    console.error('Link Firebase account error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to link account',
      error: error.message,
    });
  }
};

// Unlink Firebase account
export const unlinkFirebaseAccount = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        firebaseUid: null,
        authProvider: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Account unlinked successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        role: updatedUser.role,
      },
    });

  } catch (error) {
    console.error('Unlink Firebase account error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to unlink account',
      error: error.message,
    });
  }
}; 