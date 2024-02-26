const { getRedisInstance, timeType } = require("../clients/redis");

const redis = getRedisInstance();

async function getData(key) {
  return redis.get(key).then((result) => result);
}

async function setData(key, value, ttl) {
  redis.set(key, value, timeType, ttl);
}

async function removeData(key) {
  redis.del(key);
}

module.exports = {
  getData,
  setData,
  removeData,
};
