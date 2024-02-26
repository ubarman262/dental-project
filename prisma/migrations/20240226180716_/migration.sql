/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_dentist_id_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_patient_id_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Bucket" (
    "id" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "Bucket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bucket" ADD CONSTRAINT "Bucket_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;
