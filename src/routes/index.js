const express = require("express");
const router = express.Router();

const loginRoutes = require("./authRoutes/login");
const protectedRoutes = require("./authRoutes/protected");
const userManagementRoutes = require("./userRoutes/userManagement");
const patientManagementRoutes = require("./patientRoutes/patientManagement");
const roleManagementRoutes = require("./roleRoutes/roleManagement");

router.use("/auth", loginRoutes);
router.use("/auth", protectedRoutes);
router.use("/user", userManagementRoutes);
router.use("/role", roleManagementRoutes);
router.use("/patient", patientManagementRoutes);

module.exports = router;
