const S3 = require("aws-sdk/clients/s3.js");

const store = new S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

module.exports = {
  store,
};
