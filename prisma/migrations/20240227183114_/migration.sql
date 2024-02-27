/*
  Warnings:

  - You are about to drop the column `appointment_time` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "appointment_time",
ALTER COLUMN "appointment_date" SET DATA TYPE TIMESTAMP(3);
