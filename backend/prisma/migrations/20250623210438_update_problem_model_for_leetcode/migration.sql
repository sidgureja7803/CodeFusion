/*
  Warnings:

  - A unique constraint covering the columns `[leetcodeId]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "acceptanceRate" DOUBLE PRECISION,
ADD COLUMN     "accepted" INTEGER,
ADD COLUMN     "askedByFaang" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "companies" TEXT[],
ADD COLUMN     "discussCount" INTEGER,
ADD COLUMN     "dislikes" INTEGER,
ADD COLUMN     "frequency" DOUBLE PRECISION,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "leetcodeId" INTEGER,
ADD COLUMN     "likes" INTEGER,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "relatedTopics" TEXT[],
ADD COLUMN     "similarQuestions" TEXT,
ADD COLUMN     "solutionLink" TEXT,
ADD COLUMN     "submissions" INTEGER,
ADD COLUMN     "url" TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "examples" DROP NOT NULL,
ALTER COLUMN "constraints" DROP NOT NULL,
ALTER COLUMN "testcases" DROP NOT NULL,
ALTER COLUMN "codeSnippets" DROP NOT NULL,
ALTER COLUMN "referenceSolutions" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Problem_leetcodeId_key" ON "Problem"("leetcodeId");
