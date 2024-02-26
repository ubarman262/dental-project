/*
  Warnings:

  - You are about to drop the column `date` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "date",
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
