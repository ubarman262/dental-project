const { findPatientByPhoneNo } = require("../models/patient");
const appointmentService = require("../services/appointmentService");
const patientService = require("../services/patientService");

const createAppointment = async (req, res) => {
  try {
    const { appointment_date, status, dentist_id, patient } =
      req.body;

    const existingPatient = await findPatientByPhoneNo(patient.phone_number);

    let newPatient;

    if (!existingPatient) {
      newPatient = await patientService.createPatient({ ...patient });
    }

    const newAppointment = await appointmentService.createAppointment({
      appointment_date,
      status,
      patient_id: existingPatient
        ? existingPatient.patient_id
        : newPatient.patient_id,
      dentist_id,
      // Add other relevant appointment data here
    });

    res.json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params; // Assuming appointment ID is passed in URL params
    const { appointment_date, status } = req.body;

    const updatedAppointment = await appointmentService.updateAppointment(id, {
      appointment_date,
      status,
      // Add other fields to update if needed
    });

    res.json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params; // Assuming appointment ID is passed in URL params

    await appointmentService.deleteAppointment(id);

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
