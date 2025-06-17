# Firebase Authentication Troubleshooting Guide

## Common Issues and Solutions

### 1. **Unauthorized Domain Error**
If you see `auth/unauthorized-domain`:

**Solution:** Add your domains to Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `codefusion-27ec1`
3. Go to Authentication → Settings → Authorized domains
4. Add these domains:
   - `localhost` (for development)
   - `127.0.0.1` (for development)
   - `your-vercel-domain.vercel.app` (for production)
   - `codefusion-u7e2.onrender.com` (your backend domain)

### 2. **Google OAuth Configuration**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `codefusion-27ec1`
3. Go to APIs & Services → Credentials
4. Find your OAuth 2.0 Client ID
5. Add authorized origins:
   - `http://localhost:5173` (Vite dev server)
   - `https://your-vercel-domain.vercel.app`
6. Add authorized redirect URIs:
   - `http://localhost:5173`
   - `https://your-vercel-domain.vercel.app`

### 3. **GitHub OAuth Configuration**
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Find your CodeFusion app
3. Update Authorization callback URL:
   - `https://codefusion-27ec1.firebaseapp.com/__/auth/handler`

### 4. **Environment Variables Check**
Your current Firebase config:
```
VITE_FIREBASE_API_KEY="AIzaSyBw-7L7RTC7jJAqAfw7stTNHioCf_Vm6zQ"
VITE_FIREBASE_AUTH_DOMAIN="codefusion-27ec1.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="codefusion-27ec1"
VITE_FIREBASE_STORAGE_BUCKET="codefusion-27ec1.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="306914024430"
VITE_FIREBASE_APP_ID="1:306914024430:web:971ef9fdd582a0532d4cff"
VITE_FIREBASE_MEASUREMENT_ID="G-8N4WV3YGVX"
```

### 5. **CORS Issues**
If you're getting CORS errors, ensure:
- Backend cookies use `sameSite: "none"` for production
- Backend has proper CORS configuration
- Frontend uses `credentials: 'include'` for cross-origin requests

### 6. **Testing Steps**
1. **Open Developer Console** (F12)
2. **Click the Firebase Debug button** (red button in bottom-right)
3. **Run tests in this order:**
   - Check Firebase Config
   - Test Google Auth
   - Test GitHub Auth
   - Test Backend Connection

### 7. **Common Error Codes**
- `auth/popup-blocked`: Enable popups in browser
- `auth/popup-closed-by-user`: User closed popup too early
- `auth/unauthorized-domain`: Domain not authorized in Firebase
- `auth/configuration-not-found`: Firebase config missing/incorrect
- `auth/account-exists-with-different-credential`: User already exists with different provider

### 8. **Debug Console Commands**
Open browser console and run:
```javascript
// Check Firebase initialization
console.log('Firebase Auth:', firebase.auth());

// Check current user
console.log('Current User:', firebase.auth().currentUser);

// Check environment variables
console.log('Environment:', {
  mode: import.meta.env.MODE,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.substring(0, 10) + '...',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
});
```

### 9. **Network Tab Analysis**
1. Open Developer Tools → Network tab
2. Try signing in with Google/GitHub
3. Look for failed requests to:
   - `https://accounts.google.com/`
   - `https://github.com/login/oauth/authorize`
   - `https://codefusion-27ec1.firebaseapp.com/`

### 10. **Firebase Console Checks**
1. Go to Firebase Console → Authentication
2. Verify Sign-in methods are enabled:
   - ✅ Google (should be enabled)
   - ✅ GitHub (should be enabled)
3. Check Users tab to see if any users are being created

### Next Steps
1. **Try the debug panel first** - it will give you specific error messages
2. **Check browser console** for any JavaScript errors
3. **Verify Firebase Console settings** match the domains you're using
4. **Test in incognito mode** to rule out browser cache issues
5. **Try a different browser** to isolate browser-specific issues

### Contact Points
If issues persist:
1. Share the exact error message from the debug panel
2. Share any console errors
3. Confirm which domains are authorized in Firebase Console
4. Test both development (localhost) and production (Vercel) environments 