import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Testing database connection...');
console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@')); // Hide password
console.log('DIRECT_URL:', process.env.DIRECT_URL?.replace(/:[^:@]*@/, ':****@') || 'Not configured');

// Create Prisma client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Test connection
async function testConnection() {
  try {
    // Test connection with a simple query
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('✅ Database connection successful!');
    console.log('Query result:', result);
    
    // Additional database info
    const dbInfo = await prisma.$queryRaw`SELECT current_database(), version()`;
    console.log('Database info:', dbInfo);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error.message);
    
    // Additional error handling for common connection issues
    if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 The database server is unreachable. Check your network connectivity.');
    } else if (error.message.includes('password authentication failed')) {
      console.error('💡 Authentication failed. Check your database credentials.');
    } else if (error.message.includes('does not exist')) {
      console.error('💡 The specified database does not exist.');
    } else if (error.message.includes('Connection timed out')) {
      console.error('💡 Connection timed out. This might be due to network issues or firewall rules.');
    } else if (error.message.includes('pgbouncer')) {
      console.error('💡 PgBouncer issue detected. Make sure you have set both DATABASE_URL and DIRECT_URL.');
    }
    
    return false;
  } finally {
    // Disconnect prisma
    await prisma.$disconnect();
  }
}

// Run the test
testConnection()
  .then(success => {
    if (!success) process.exit(1);
  })
  .catch(e => {
    console.error('Unexpected error:', e);
    process.exit(1);
  });
