const patientService = require("../services/patientService");

const createPatient = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, age } =
      req.body;

    if (await patientService.patientExists(phone_number)) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const newPatient = await patientService.createPatient({
      first_name,
      last_name,
      email,
      phone_number,
      age,
    });

    res.json({
      message: "Patient created successfully",
      patient: {
        first_name: newPatient.first_name,
        last_name: newPatient.last_name,
        email: newPatient.email,
        phone_number: newPatient.phone_number,
        age: newPatient.age,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatedPatient = async (req, res) => {
  const { phone_number, data } = req.body;

  try {
    if (!(await patientService.patientExists(phone_number))) {
      return res.status(400).json({ message: "Patient not found" });
    }

    const updatedPatient = await patientService.updatePatient(
      phone_number,
      data
    );

    res.json({
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePatient = async (req, res) => {
  const { email } = req.body;
  try {
    if (!(await patientService.patientExists(email))) {
      return res.status(400).json({ message: "Patient not found" });
    }

    const patient = await patientService.deletePatient(email);

    res.json({
      message: "Patient deleted",
      patient: {
        email: patient.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPatient,
  deletePatient,
  updatedPatient,
};
