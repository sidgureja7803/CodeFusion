import { create } from 'zustand';
import { signInWithGoogle, signInWithGithub, signOut, handleRedirectResult } from '../libs/firebase';
import { axiosInstance } from '../libs/axios';
import { Toast } from './useToastStore';

export const useFirebaseAuthStore = create((set, get) => ({
  isLoading: false,
  error: null,

  // Handle redirect result (call on app initialization)
  handleRedirectResult: async () => {
    try {
      const result = await handleRedirectResult();
      if (result && result.idToken) {
        console.log('🔍 Processing redirect result...');
        set({ isLoading: true });

        // Send token to backend
        const response = await axiosInstance.post('/firebase-auth/login', {
          idToken: result.idToken,
          provider: result.provider
        });

        if (response.data.success) {
          Toast.success('Successfully signed in!');
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error('Redirect result error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to complete sign-in';
      Toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  // Wake up backend (for Render deployment)
  wakeUpBackend: async () => {
    try {
      console.log("🚀 Waking up backend...");
      const response = await axiosInstance.get("/wake-up", { timeout: 10000 });
      console.log("✅ Backend is awake:", response.data.message);
      return true;
    } catch (error) {
      console.error("⚠️ Failed to wake up backend:", error.message);
      return false;
    }
  },

  // Google Sign In
  signInWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });

      // Wake up backend first
      await get().wakeUpBackend();

      const result = await signInWithGoogle();

      // If result is null, it means redirect is happening
      if (!result) {
        console.log('🔄 Redirecting to Google sign-in...');
        return;
      }

      const { idToken, provider } = result;

      // Send token to backend
      const response = await axiosInstance.post('/firebase-auth/login', {
        idToken,
        provider
      });

      if (response.data.success) {
        Toast.success('Successfully signed in with Google!');
        // The auth store will be updated via the auth middleware
        window.location.href = '/dashboard';
      }

    } catch (error) {
      console.error('Google sign-in error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to sign in with Google';
      set({ error: errorMessage });
      Toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // GitHub Sign In
  signInWithGithub: async () => {
    try {
      set({ isLoading: true, error: null });

      // Wake up backend first
      await get().wakeUpBackend();

      const result = await signInWithGithub();

      // If result is null, it means redirect is happening
      if (!result) {
        console.log('🔄 Redirecting to GitHub sign-in...');
        return;
      }

      const { idToken, provider } = result;

      // Send token to backend
      const response = await axiosInstance.post('/firebase-auth/login', {
        idToken,
        provider
      });

      if (response.data.success) {
        Toast.success('Successfully signed in with GitHub!');
        // The auth store will be updated via the auth middleware
        window.location.href = '/dashboard';
      }

    } catch (error) {
      console.error('GitHub sign-in error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to sign in with GitHub';
      set({ error: errorMessage });
      Toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Link Firebase account to existing user
  linkAccount: async (provider) => {
    try {
      set({ isLoading: true, error: null });

      let result;
      if (provider === 'google') {
        result = await signInWithGoogle();
      } else if (provider === 'github') {
        result = await signInWithGithub();
      } else {
        throw new Error('Unsupported provider');
      }

      const { idToken } = result;

      // Send token to backend to link account
      const response = await axiosInstance.post('/firebase-auth/link', {
        idToken,
        provider: result.provider
      });

      if (response.data.success) {
        Toast.success(`Successfully linked ${provider} account!`);
        return response.data.user;
      }

    } catch (error) {
      console.error('Account linking error:', error);
      const errorMessage = error.response?.data?.message || `Failed to link ${provider} account`;
      set({ error: errorMessage });
      Toast.error(errorMessage);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Unlink Firebase account
  unlinkAccount: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await axiosInstance.post('/firebase-auth/unlink');

      if (response.data.success) {
        Toast.success('Account unlinked successfully!');
        return response.data.user;
      }

    } catch (error) {
      console.error('Account unlinking error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to unlink account';
      set({ error: errorMessage });
      Toast.error(errorMessage);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign out from Firebase
  signOutFirebase: async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Firebase sign-out error:', error);
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
})); 