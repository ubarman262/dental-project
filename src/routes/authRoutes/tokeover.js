const express = require("express");
const router = express.Router();
const authContoller = require("../../controllers/authController");

router.post("/takeover", authContoller.takeover);

module.exports = router;
