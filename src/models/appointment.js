const { getPrismaInstance } = require("../clients/prisma");
const prisma = getPrismaInstance();

const Appointment = {
  async createAppointment(data) {
    try {
      const appointment = await prisma.appointment.create({
        data: {
          appointment_date: new Date(data.appointment_date + " UTC"),
          status: data.status,
          patient: { connect: { patient_id: data.patient_id } },
          dentist: data.dentist_id
            ? { connect: { dentist_id: data.dentist_id } }
            : undefined,
          // other relevant appointment details
        },
      });
      return appointment;
    } catch (error) {
      throw new Error(`Unable to create appointment: ${error}`);
    }
  },

  async getAppointmentsByDate(date) {
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          appointment_date: {
            equals: new Date(date),
          },
        },
        orderBy: {
          appointment_date: "desc", // Sorting by date in descending order
        },
      });
      return appointments;
    } catch (error) {
      throw new Error(`Unable to get appointments: ${error}`);
    }
  },

  // Add other CRUD operations for appointments as needed
};

module.exports = Appointment;
