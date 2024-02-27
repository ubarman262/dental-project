const { getPrismaInstance } = require("../clients/prisma");
const { convertDate } = require("../utils/dateUtils");

const prisma = getPrismaInstance();

const Patient = {
  async createPatient(data) {
    try {
      const patient = await prisma.patient.create({
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          age: data.age,
          // other relevant patient details
        },
      });
      return patient;
    } catch (error) {
      throw new Error(`Unable to create patient: ${error}`);
    }
  },

  async findPatientById(id) {
    try {
      const patient = await prisma.patient.findUnique({
        where: {
          patient_id: id,
        },
      });
      return patient;
    } catch (error) {
      throw new Error(`Unable to find patient: ${error}`);
    }
  },

  async findPatientByPhoneNo(phone_number) {
    try {
      const patients = await prisma.patient.findMany({
        where: {
          phone_number: phone_number,
        },
      });
      return patients.length === 1 ? patients[0] : null;
    } catch (error) {
      throw new Error(`Unable to find patient: ${error}`);
    }
  },

  async updatePatientById(id, data) {
    try {
      const updatedPatient = await prisma.patient.update({
        where: {
          patient_id: id,
        },
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          age: data.age,
          // other relevant patient details
        },
      });
      return updatedPatient;
    } catch (error) {
      throw new Error(`Unable to update patient: ${error}`);
    }
  },

  async deletePatientById(id) {
    try {
      const deletedPatient = await prisma.patient.delete({
        where: {
          patient_id: id,
        },
      });
      return deletedPatient;
    } catch (error) {
      throw new Error(`Unable to delete patient: ${error}`);
    }
  },

  async deletePatientByEmail(email) {
    try {
      const deletedPatient = await prisma.patient.delete({
        where: {
          email,
        },
      });
      return deletedPatient;
    } catch (error) {
      throw new Error(`Unable to delete patient: ${error}`);
    }
  },
};

module.exports = Patient;
