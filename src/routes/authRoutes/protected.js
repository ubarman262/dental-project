const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authMiddleware");
const authContoller = require("../../controllers/authController");

// Route to access protected resource
router.get("/protected", verifyToken, authContoller.protected);

module.exports = router;
