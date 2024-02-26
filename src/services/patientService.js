const Patient = require("../models/patient");

async function createPatient({
  first_name,
  last_name,
  email,
  phone_number,
  date_of_birth,
}) {
  const newPatient = await Patient.createPatient({
    first_name,
    last_name,
    email,
    phone_number,
    date_of_birth,
  });
  return newPatient;
}

async function updatePatient(phone_number, data) {
  const patient = await Patient.findPatientByPhoneNo(phone_number);
  const updatedPatient = await Patient.updatePatientById(
    patient.patient_id,
    data
  );
  return updatedPatient;
}

async function patientExists(phone_number) {
  return await Patient.findPatientByPhoneNo(phone_number);
}

async function deletePatient(email) {
  return Patient.deletePatientByEmail(email);
}

module.exports = {
  createPatient,
  patientExists,
  deletePatient,
  updatePatient,
};
