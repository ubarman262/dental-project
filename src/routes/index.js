const express = require("express");
const router = express.Router();

const loginRoutes = require("./authRoutes/login");
const takeoverRoutes = require("./authRoutes/tokeover");
const validityRoutes = require("./authRoutes/validity");
const userManagementRoutes = require("./userRoutes/userManagement");
const patientManagementRoutes = require("./patientRoutes/patientManagement");
const roleManagementRoutes = require("./roleRoutes/roleManagement");
const appointmentRoutes = require("./appointmentRoutes/appointmentRoutes");

router.use("/auth", loginRoutes);
router.use("/auth", validityRoutes);
router.use("/auth", takeoverRoutes);
router.use("/user", userManagementRoutes);
router.use("/role", roleManagementRoutes);
router.use("/patient", patientManagementRoutes);
router.use("/appointment", appointmentRoutes);

module.exports = router;
