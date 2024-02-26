const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authMiddleware");
const patientController = require("../../controllers/patientController");
const storeController = require("../../controllers/storeController");
const upload = require("../../middleware/multerMiddleware");

router.post("/create", verifyToken, patientController.createPatient);
router.put("/update", verifyToken, patientController.updatedPatient);
router.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  storeController.uploadSingle
);
router.post("/objects", verifyToken, storeController.allObjects);
router.post("/download", verifyToken, storeController.download);

module.exports = router;
