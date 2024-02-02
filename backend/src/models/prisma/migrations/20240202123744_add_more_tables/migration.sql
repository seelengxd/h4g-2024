/*
  Warnings:

  - You are about to drop the `ActivityDate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[activityId]` on the table `EnrollmentForm` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "Salutation" AS ENUM ('Mr', 'Mrs', 'Ms', 'Miss', 'Madam', 'Dr');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- DropForeignKey
ALTER TABLE "ActivityDate" DROP CONSTRAINT "ActivityDate_activityId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "capacity" INTEGER,
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "friday" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "monday" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "saturday" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sunday" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "thursday" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tuesday" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wednesday" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "ActivityDate";

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "activityId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "attendance" BOOLEAN,
    "userId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "userReflection" TEXT NOT NULL,
    "actualFeedback" TEXT NOT NULL,
    "hoursServed" INTEGER NOT NULL,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "answer" JSONB NOT NULL,
    "enrollmentFormId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InterestToOrganisation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BlogToInterest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_enrollmentFormId_userId_key" ON "Submission"("enrollmentFormId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_InterestToOrganisation_AB_unique" ON "_InterestToOrganisation"("A", "B");

-- CreateIndex
CREATE INDEX "_InterestToOrganisation_B_index" ON "_InterestToOrganisation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BlogToInterest_AB_unique" ON "_BlogToInterest"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogToInterest_B_index" ON "_BlogToInterest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "EnrollmentForm_activityId_key" ON "EnrollmentForm"("activityId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_enrollmentFormId_fkey" FOREIGN KEY ("enrollmentFormId") REFERENCES "EnrollmentForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestToOrganisation" ADD CONSTRAINT "_InterestToOrganisation_A_fkey" FOREIGN KEY ("A") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestToOrganisation" ADD CONSTRAINT "_InterestToOrganisation_B_fkey" FOREIGN KEY ("B") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToInterest" ADD CONSTRAINT "_BlogToInterest_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToInterest" ADD CONSTRAINT "_BlogToInterest_B_fkey" FOREIGN KEY ("B") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
