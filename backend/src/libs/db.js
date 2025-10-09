import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not defined in environment variables");
  console.error("Please check your .env file and make sure DATABASE_URL is properly set");
}

// Create a new Prisma client instance
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
    },
  },
  // Add error logging
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

// Log database connection issues
prisma.$on("error", (e) => {
  console.error("❌ Prisma Error:", e);
});

// Connect to the database with retry logic
export const connectDatabase = async (retries = 5, delay = 5000) => {
  try {
    console.log("🔄 Connecting to database...");
    
    // Attempt to connect to the database
    await prisma.$connect();
    
    console.log("✅ Database connected successfully");
    return true;
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    
    // Check if we should retry
    if (retries > 0) {
      console.log(`⏳ Retrying in ${delay / 1000} seconds... (${retries} attempts left)`);
      
      // Wait for the specified delay
      await new Promise((resolve) => setTimeout(resolve, delay));
      
      // Retry connection
      return connectDatabase(retries - 1, delay);
    } else {
      console.error("❌ Maximum retry attempts reached. Could not connect to database.");
      
      // Log database URL for debugging (with password redacted)
      const dbUrlForLogging = process.env.DATABASE_URL 
        ? process.env.DATABASE_URL.replace(/\/\/[^:]+:[^@]+@/, "//[REDACTED]:[REDACTED]@")
        : "undefined";
      
      console.error(`Database URL: ${dbUrlForLogging}`);
      
      // Return false to indicate connection failure
      return false;
    }
  }
};

// Disconnect from the database
export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected successfully");
    return true;
  } catch (error) {
    console.error(`❌ Database disconnection failed: ${error.message}`);
    return false;
  }
};

// Export the Prisma client instance
export default prisma;
export { prisma as db };