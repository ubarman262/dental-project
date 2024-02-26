const multer = require("multer");

// Multer storage configuration
const storage = multer.memoryStorage(); // Store files in memory

// Multer file filter function
const fileFilter = (req, file, cb) => {
  // Check file type (e.g., allow only images)
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only images are allowed")); // Reject the file
  }
};

// Initialize multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
