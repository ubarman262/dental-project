const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authMiddleware");
const appointController = require("../../controllers/appointmentController");

router.post("/create", verifyToken, appointController.createAppointment);
router.put("/update", verifyToken, appointController.updateAppointment);
router.put("/delete", verifyToken, appointController.deleteAppointment);

module.exports = router;
