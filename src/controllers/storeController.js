const { customAlphabet } = require("nanoid");
const path = require("path");
const storeService = require("../services/storeService");

const uploadSingle = async (req, res) => {
  const { patient_id } = req.body;

  if (!patient_id) {
    return res.status(400).json({ message: "Patient id missing" });
  }

  // Check if a file is included in the request
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Extract the file data from the request
  const { originalname, buffer } = req.file;
  const nanoid = customAlphabet("1234567890abcdef", 6);
  const { name, ext } = path.parse(originalname);

  try {
    // Upload the file to the S3 bucket
    const result = await storeService.addObjectToBucketWithSubdirectory(
      process.env.S3_BASE_BUCKET,
      patient_id,
      `${name}-${nanoid()}${ext}`, // Use the original filename as the object key
      buffer // Use the file buffer as the object content
    );

    res.json({ message: "File uploaded successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const allObjects = async (req, res) => {
  const { patient_id } = req.body;

  if (!patient_id) {
    return res.status(400).json({ message: "Patient id missing" });
  }

  try {
    const result = await storeService.getBucketContent(process.env.S3_BASE_BUCKET);
    res.json({ message: "Files", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const download = async (req, res) => {
  const { patient_id, object_key } = req.body;

  if (!patient_id) {
    return res.status(400).json({ message: "Patient id missing" });
  }

  if (!object_key) {
    return res.status(400).json({ message: "Key missing" });
  }

  try {
    const fileStream = await storeService.getItemFromBucket(
      process.env.S3_BASE_BUCKET,
      object_key
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${object_key.split("/")[1]}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  uploadSingle,
  allObjects,
  download,
};
