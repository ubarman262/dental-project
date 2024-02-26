const Redis = require("ioredis");
const dotenv = require("dotenv");

dotenv.config();

const timeType = "EX"; //seconds, use PX for miliseconds

let redisInstance;

function getRedisInstance() {
  if (!redisInstance) {
    const redisUri = process.env.REDIS_URL;
    redisInstance = new Redis(redisUri);
  }
  return redisInstance;
}

module.exports = { getRedisInstance, timeType };
