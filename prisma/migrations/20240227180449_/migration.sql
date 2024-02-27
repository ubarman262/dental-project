-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_dentist_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "dentist_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_dentist_id_fkey" FOREIGN KEY ("dentist_id") REFERENCES "Dentist"("dentist_id") ON DELETE SET NULL ON UPDATE CASCADE;
