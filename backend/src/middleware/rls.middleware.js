import { db } from '../libs/db.js';

export const setUserContext = async (req, res, next) => {
  try {
    // Set user context for RLS policies
    if (req.loggedInUser) {
      await db.$executeRaw`SELECT set_config('app.current_user_id', ${req.loggedInUser.id}, true)`;
    }
    next();
  } catch (error) {
    console.error('Error setting user context:', error);
    next(); // Continue even if setting context fails
  }
};

export const clearUserContext = async (req, res, next) => {
  try {
    // Clear user context after request
    await db.$executeRaw`SELECT set_config('app.current_user_id', '', true)`;
    next();
  } catch (error) {
    console.error('Error clearing user context:', error);
    next(); // Continue even if clearing context fails
  }
}; 