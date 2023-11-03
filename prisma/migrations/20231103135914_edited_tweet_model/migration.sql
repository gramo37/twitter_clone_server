-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_authorId_fkey";

-- CreateIndex
CREATE INDEX "Tweet_authorId_idx" ON "Tweet"("authorId");
