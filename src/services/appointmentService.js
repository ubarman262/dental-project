const Appointment = require("../models/appointment");

async function createAppointment({ ...data }) {
  const newAppointment = await Appointment.createAppointment(data);
  return newAppointment;
}

async function updateAppointment(appointment_id, data) {
  const updatedAppointment = await Appointment.update(appointment_id, data);
  return updatedAppointment;
}

async function getAppointmentById(appointment_id) {
  const appointment = await Appointment.findById(appointment_id);
  return appointment;
}

async function deleteAppointment(appointment_id) {
  return Appointment.delete(appointment_id);
}

async function getAppointmentsByPatientId(patient_id) {
  const appointments = await Appointment.findByPatientId(patient_id);
  return appointments;
}

async function getAppointmentsByDentistId(dentist_id) {
  const appointments = await Appointment.findByDentistId(dentist_id);
  return appointments;
}

async function getAppointmentsByDate(date) {
  const appointments = await Appointment.findByDate(date);
  return appointments.sort((a, b) => b.appointment_date - a.appointment_date);
}

module.exports = {
  createAppointment,
  updateAppointment,
  getAppointmentById,
  deleteAppointment,
  getAppointmentsByPatientId,
  getAppointmentsByDentistId,
  getAppointmentsByDate,
};
