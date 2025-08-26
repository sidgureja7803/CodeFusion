import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/design-system.css';

// Button variants
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'cf-btn';
  
  const variantClasses = {
    primary: 'cf-btn-primary',
    secondary: 'cf-btn-secondary',
    danger: 'cf-btn-danger',
    outline: 'border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
  };
  
  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'py-2 px-4',
    lg: 'text-lg py-3 px-6'
  };
  
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClass} ${className}`;
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      type={type}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

// Animated button with Framer Motion
export const AnimatedButton = ({ 
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'cf-btn';
  
  const variantClasses = {
    primary: 'cf-btn-primary',
    secondary: 'cf-btn-secondary',
    danger: 'cf-btn-danger',
    outline: 'border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
  };
  
  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'py-2 px-4',
    lg: 'text-lg py-3 px-6'
  };
  
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClass} ${className}`;
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Card component
export const Card = ({ 
  children, 
  className = '', 
  padding = 'normal',
  ...props 
}) => {
  const paddingClass = {
    none: '',
    sm: 'p-3',
    normal: 'p-6',
    lg: 'p-8'
  };

  return (
    <div 
      className={`cf-card ${paddingClass[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Animated Card with Framer Motion
export const AnimatedCard = ({ 
  children, 
  className = '', 
  padding = 'normal',
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props 
}) => {
  const paddingClass = {
    none: '',
    sm: 'p-3',
    normal: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div 
      className={`cf-card ${paddingClass[padding]} ${className}`}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Input component
export const Input = ({ 
  label, 
  id, 
  type = 'text', 
  placeholder, 
  value,
  onChange,
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium dark:text-gray-200 text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`cf-input ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

// Badge component
export const Badge = ({ 
  children,
  variant = 'default',
  className = '',
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    easy: 'cf-badge-easy',
    medium: 'cf-badge-medium',
    hard: 'cf-badge-hard'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Alert component
export const Alert = ({ 
  children,
  variant = 'info',
  className = '',
  ...props 
}) => {
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    success: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    error: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <div
      className={`p-4 mb-4 rounded-md ${variantClasses[variant]} ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};

// DifficultyBadge component
export const DifficultyBadge = ({ difficulty }) => {
  const difficultyMap = {
    'EASY': { variant: 'easy', text: 'Easy' },
    'MEDIUM': { variant: 'medium', text: 'Medium' },
    'HARD': { variant: 'hard', text: 'Hard' }
  };

  const { variant, text } = difficultyMap[difficulty] || { variant: 'default', text: difficulty };

  return <Badge variant={variant}>{text}</Badge>;
};

// Loading Spinner
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${className}`}></div>
  );
};

// Section divider
export const Divider = ({ className = '' }) => {
  return <div className={`border-t border-gray-200 dark:border-gray-700 my-4 ${className}`}></div>;
};

export default {
  Button,
  AnimatedButton,
  Card,
  AnimatedCard,
  Input,
  Badge,
  Alert,
  DifficultyBadge,
  Spinner,
  Divider
};
