/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Dentist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `Dentist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dentist_email_key" ON "Dentist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dentist_phone_number_key" ON "Dentist"("phone_number");
