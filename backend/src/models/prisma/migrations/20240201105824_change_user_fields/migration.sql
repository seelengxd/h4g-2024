/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "preferredName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InterestToProfile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_name_key" ON "Interest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToSkill_AB_unique" ON "_ProfileToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToSkill_B_index" ON "_ProfileToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InterestToProfile_AB_unique" ON "_InterestToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_InterestToProfile_B_index" ON "_InterestToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToSkill" ADD CONSTRAINT "_ProfileToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToSkill" ADD CONSTRAINT "_ProfileToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestToProfile" ADD CONSTRAINT "_InterestToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestToProfile" ADD CONSTRAINT "_InterestToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
