-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_registrationId_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_enrollmentFormId_fkey";

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "registrationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Registration" ALTER COLUMN "enrollmentFormId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_enrollmentFormId_fkey" FOREIGN KEY ("enrollmentFormId") REFERENCES "EnrollmentForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
