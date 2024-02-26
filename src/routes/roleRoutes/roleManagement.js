const express = require("express");
const router = express.Router();
const {
  verifyToken,
  checkUserRole,
} = require("../../middleware/authMiddleware");
const roleController = require("../../controllers/roleController");

// Route to create a new user (protected)
router.post("/create", verifyToken, roleController.createRole);
router.delete(
  "/delete",
  verifyToken,
  checkUserRole("admin"),
  roleController.deleteRole
);

module.exports = router;
