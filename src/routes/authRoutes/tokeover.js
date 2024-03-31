const express = require("express");
const router = express.Router();
const authContoller = require("../../controllers/authController");
const { verifyToken } = require("../../middleware/authMiddleware");

router.post("/takeover", authContoller.takeover);

module.exports = router;
