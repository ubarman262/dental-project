const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authMiddleware");
const authContoller = require("../../controllers/authController");

router.get("/validity", verifyToken, authContoller.validity);

module.exports = router;
