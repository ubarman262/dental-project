/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `Patient` table. All the data in the column will be lost.
  - Changed the type of `appointment_time` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `age` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "appointment_date" SET DATA TYPE DATE,
DROP COLUMN "appointment_time",
ADD COLUMN     "appointment_time" TIME NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "date_of_birth",
ADD COLUMN     "age" INTEGER NOT NULL;
