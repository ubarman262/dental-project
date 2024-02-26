const express = require("express");
const router = express.Router();
const {
  verifyToken,
  checkUserRole,
} = require("../../middleware/authMiddleware");
const userController = require("../../controllers/userController");

router.post("/create", verifyToken, userController.createUser);
router.delete(
  "/delete",
  verifyToken,
  checkUserRole("admin"),
  userController.deleteUser
);

module.exports = router;
