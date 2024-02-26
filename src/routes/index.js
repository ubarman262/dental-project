const express = require("express");
const router = express.Router();

const loginRoutes = require("./authRoutes/login");
const protectedRoutes = require("./authRoutes/protected");
const userManagementRoutes = require("./userRoutes/userManagement");
const roleManagementRoutes = require("./roleRoutes/roleManagement");

router.use("/auth", loginRoutes);
router.use("/auth", protectedRoutes);
router.use("/user", userManagementRoutes);
router.use("/role", roleManagementRoutes);

module.exports = router;
