/*
  Warnings:

  - You are about to drop the column `enrollmentFormId` on the `Registration` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_enrollmentFormId_fkey";

-- DropIndex
DROP INDEX "Registration_enrollmentFormId_key";

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "enrollmentFormId",
ADD COLUMN     "submissionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
