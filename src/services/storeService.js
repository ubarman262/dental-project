const { store } = require("../clients/storage");
const { filterBucketListData } = require("../utils/pathUtils");

// Function to get a list of buckets
async function getBucketList() {
  try {
    const data = await store.listBuckets().promise();
    return data.Buckets.map((bucket) => bucket.Name);
  } catch (error) {
    throw new Error(`Unable to get bucket list: ${error.message}`);
  }
}

// Function to get the contents of a bucket
async function getBucketContent(bucketName) {
  try {
    const data = await store.listObjects({ Bucket: bucketName }).promise();
    // return filterBucketListData(data);
    return filterBucketListData(data).sort((a, b) => {
      return new Date(b.lastModified) - new Date(a.lastModified);
    });
  } catch (error) {
    throw new Error(`Unable to get bucket content: ${error.message}`);
  }
}

// Function to get an item from a bucket
async function getItemFromBucket(bucketName, key) {
  try {
    const fileStream = store
      .getObject({ Bucket: bucketName, Key: key })
      .createReadStream();

    fileStream.on("error", (error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
    return fileStream;
  } catch (error) {
    throw new Error(`Unable to get item from bucket: ${error.message}`);
  }
}

// Function to add an object to a bucket
async function addObjectToBucket(bucketName, key, body) {
  try {
    await store
      .putObject({ Bucket: bucketName, Key: key, Body: body })
      .promise();
    return `Object added to bucket ${bucketName} with key ${key}`;
  } catch (error) {
    throw new Error(`Unable to add object to bucket: ${error.message}`);
  }
}

// Function to add an object to a bucket with a subdirectory
async function addObjectToBucketWithSubdirectory(
  bucketName,
  subdirectory,
  key,
  body
) {
  try {
    const params = {
      Bucket: bucketName,
      Key: `${subdirectory}/${key}`, // Include the subdirectory in the key
      Body: body,
    };
    await store.putObject(params).promise();
    return `Object added to bucket ${bucketName} in subdirectory ${subdirectory} with key ${key}`;
  } catch (error) {
    throw new Error(
      `Unable to add object to bucket with subdirectory: ${error.message}`
    );
  }
}

// Function to add multiple objects to a bucket
async function addMultipleObjectsToBucket(bucketName, objects) {
  try {
    const params = {
      Bucket: bucketName,
      Delete: { Objects: objects.map((object) => ({ Key: object.key })) },
    };
    await store.putObjects(params).promise();
    return `Multiple objects added to bucket ${bucketName}`;
  } catch (error) {
    throw new Error(
      `Unable to add multiple objects to bucket: ${error.message}`
    );
  }
}

// Function to delete objects from a bucket
async function deleteObjectsFromBucket(bucketName, keys) {
  try {
    const params = {
      Bucket: bucketName,
      Delete: { Objects: keys.map((key) => ({ Key: key })) },
    };
    await store.deleteObjects(params).promise();
    return `Objects deleted from bucket ${bucketName}`;
  } catch (error) {
    throw new Error(`Unable to delete objects from bucket: ${error.message}`);
  }
}

module.exports = {
  getBucketList,
  getBucketContent,
  getItemFromBucket,
  addObjectToBucket,
  addMultipleObjectsToBucket,
  deleteObjectsFromBucket,
  addObjectToBucketWithSubdirectory,
};
