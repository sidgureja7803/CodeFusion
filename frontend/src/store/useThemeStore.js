import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Theme Store - Manages dark/light mode across the application
 * Uses localStorage to persist theme preference
 */
export const useThemeStore = create(
  persist(
    (set) => ({
      // Default to dark mode
      theme: 'dark',
      
      /**
       * Toggle between dark and light mode
       */
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        
        // Update document class for Tailwind dark mode
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('dark', 'light');
          document.documentElement.classList.add(newTheme);
          // Also set data-theme attribute for CSS variables
          document.documentElement.setAttribute('data-theme', newTheme);
        }
        
        return { theme: newTheme };
      }),
      
      /**
       * Set specific theme (dark or light)
       * @param {string} theme - 'dark' or 'light'
       */
      setTheme: (theme) => set(() => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('dark', 'light');
          document.documentElement.classList.add(theme);
          // Also set data-theme attribute for CSS variables
          document.documentElement.setAttribute('data-theme', theme);
        }
        return { theme };
      }),
      
      /**
       * Get current theme
       */
      isDark: () => {
        const state = useThemeStore.getState();
        return state.theme === 'dark';
      },
    }),
    {
      name: 'codefusion-theme', // localStorage key
      onRehydrateStorage: () => (state) => {
        // Apply theme on initial load
        if (state && typeof document !== 'undefined') {
          document.documentElement.classList.add(state.theme);
          document.documentElement.setAttribute('data-theme', state.theme);
        }
      },
    }
  )
);

// Initialize theme on app load
if (typeof window !== 'undefined') {
  const initialState = useThemeStore.getState();
  document.documentElement.classList.add(initialState.theme);
  document.documentElement.setAttribute('data-theme', initialState.theme);
}
