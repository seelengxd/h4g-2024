/*
  Warnings:

  - You are about to drop the column `image_url` on the `Organisation` table. All the data in the column will be lost.
  - You are about to drop the column `website_url` on the `Organisation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organisation" DROP COLUMN "image_url",
DROP COLUMN "website_url",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "websiteUrl" TEXT;

-- CreateTable
CREATE TABLE "EnrollmentForm" (
    "id" SERIAL NOT NULL,
    "formSchema" JSONB NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "EnrollmentForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EnrollmentForm" ADD CONSTRAINT "EnrollmentForm_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
