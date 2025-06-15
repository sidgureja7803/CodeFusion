import express from 'express';
import { 
  firebaseLogin, 
  linkFirebaseAccount, 
  unlinkFirebaseAccount 
} from '../controllers/firebase-auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const firebaseAuthRoutes = express.Router();

// Firebase authentication routes
firebaseAuthRoutes.post('/login', firebaseLogin);
firebaseAuthRoutes.post('/link', authMiddleware, linkFirebaseAccount);
firebaseAuthRoutes.post('/unlink', authMiddleware, unlinkFirebaseAccount);

export default firebaseAuthRoutes; 