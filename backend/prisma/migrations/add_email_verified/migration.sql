-- AddEmailVerified
-- This migration adds the emailVerified field to the User table

-- AlterTable
ALTER TABLE "User" ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- Update existing users to have emailVerified = true (for backward compatibility)
-- Comment out the next line if you want all existing users to verify their email
UPDATE "User" SET "emailVerified" = true WHERE "emailVerified" = false;

