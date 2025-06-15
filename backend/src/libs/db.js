import { PrismaClient } from "../generated/prisma/index.js";

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Test database connection
export const connectDatabase = async () => {
  try {
    await db.$connect();
    console.log("🗄️  Database connected successfully!");
    console.log("📊 Database URL:", process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@')); // Hide password
    
    // Test a simple query to ensure everything works
    const userCount = await db.user.count();
    console.log(`👥 Total users in database: ${userCount}`);
    
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error.message);
    return false;
  }
};

// Graceful shutdown
export const disconnectDatabase = async () => {
  try {
    await db.$disconnect();
    console.log("🔌 Database disconnected successfully!");
  } catch (error) {
    console.error("❌ Error disconnecting from database:", error.message);
  }
};
