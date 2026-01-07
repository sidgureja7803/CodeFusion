import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { motion } from 'framer-motion';

/**
 * ThemeToggle Component
 * A beautiful animated toggle button for switching between dark and light modes
 */
const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-14 h-7 rounded-full transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-slate-700 to-slate-800' 
          : 'bg-gradient-to-r from-orange-400 to-yellow-400'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sliding circle with icon */}
      <motion.div
        className={`absolute w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
          isDark 
            ? 'bg-slate-900' 
            : 'bg-white'
        }`}
        animate={{
          x: isDark ? -10 : 10,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ 
            rotate: isDark ? 0 : 360,
            scale: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-blue-400" />
          ) : (
            <Sun className="w-4 h-4 text-orange-500" />
          )}
        </motion.div>
      </motion.div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={`w-3 h-3 transition-opacity ${isDark ? 'opacity-0' : 'opacity-40'} text-white`} />
        <Moon className={`w-3 h-3 transition-opacity ${isDark ? 'opacity-40' : 'opacity-0'} text-white`} />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
