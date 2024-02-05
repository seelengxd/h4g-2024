/*
  Warnings:

  - A unique constraint covering the columns `[registrationId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enrollmentFormId]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registrationId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollmentFormId` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "registrationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "enrollmentFormId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_registrationId_key" ON "Feedback"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_enrollmentFormId_key" ON "Registration"("enrollmentFormId");

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_enrollmentFormId_fkey" FOREIGN KEY ("enrollmentFormId") REFERENCES "EnrollmentForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
