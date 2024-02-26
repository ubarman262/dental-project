const filterBucketListData = (data) => {
  return data.Contents.map((object) => {
    return {
      key: object.Key,
      lastModified: object.LastModified,
      size: object.Size,
    };
  });
};

module.exports = {
  filterBucketListData,
};
