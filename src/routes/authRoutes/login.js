const express = require("express");
const router = express.Router();
const authContoller = require("../../controllers/authController");
const { verifyToken } = require("../../middleware/authMiddleware");

router.post("/login", authContoller.login);
router.post("/logout", verifyToken, authContoller.logout);
router.post("/refresh-token", authContoller.refreshToken)

module.exports = router;
